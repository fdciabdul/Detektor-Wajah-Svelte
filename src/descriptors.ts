import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { LabeledFaceDescriptors, euclideanDistance } from 'face-api.js'
import type { FaceDetection, FaceLandmarks68, WithFaceDescriptor, WithFaceLandmarks } from 'face-api.js';
import { generateColorHex } from './utilities';

/**
 * Keeps state of known users that have been in the video feed
 * Each face descriptor utilizes a random color hex combination
 * as it's label
 */
export const labeledDescriptors: Writable<LabeledFaceDescriptors[]> = writable([]);

/**
 * Compares live-feed detection of descriptors with already labeled descriptors and adds a new labeled descriptor
 * when no matches are found
 * @param labeledDescriptors (LabeledFaceDescriptors[]): Descriptor arrays with labels assigned to each one
 * @param faceDescriptors (WithFaceDescriptor<WithFaceLandmarks<{ detection: FaceDetection }, FaceLandmarks68>>[]):
 * Raw descriptor data from video feed 
 */
export const updateLabeledDescriptors = (labeledDescriptors: LabeledFaceDescriptors[], faceDescriptors: WithFaceDescriptor<
    WithFaceLandmarks<{ detection: FaceDetection }, FaceLandmarks68>
  >[]) => {

    // Iterate through all faces found on video feed and attempt to match with the labeled descriptors
    faceDescriptors.forEach((faceDescriptor) => {
        let isMatchFound = false;

        labeledDescriptors.forEach((labeledDescriptor: LabeledFaceDescriptors) => {
            if (isWithinThreshold(labeledDescriptor.descriptors[0], faceDescriptor.descriptor)) {
                // Match has been found - move onto next face descriptor
                isMatchFound = true;
                return;
            }
        });

        if (!isMatchFound) {
            // Create a new label if no matches are found
            const newColor: string = generateColorHex();
            const newLabeledDescriptor = new LabeledFaceDescriptors(newColor, [faceDescriptor.descriptor]);
            labeledDescriptors.push(newLabeledDescriptor);
        }
    });
};

/**
 * Determines if descriptors of two faces match by computing euclidean distance between two vector points
 * @param faceDescVector1 (Float32Array): Vector of face descriptors 
 * @param faceDescVector2 (Float32Array): Vector of face descriptors 
 * @returns boolean: True if under threshold (match), false otherwise
 */
const isWithinThreshold = (faceDescVector1: Float32Array, faceDescVector2: Float32Array) => {
    return euclideanDistance(faceDescVector1, faceDescVector2) < 0.6;
};