import type {
    FaceDetection,
    FaceLandmarks68,
    FaceMatch,
    IDimensions,
    LabeledFaceDescriptors,
    TNetInput,
    WithFaceDescriptor,
    WithFaceLandmarks,
} from "face-api.js";
import { detectAllFaces, TinyFaceDetectorOptions, resizeResults, matchDimensions,  FaceMatcher, draw } from 'face-api.js';
import { updateLabeledDescriptors } from "./descriptors";

export type VideoFeed = HTMLElement & TNetInput & HTMLMediaElement;
export type CanvasType = Element & IDimensions & HTMLCanvasElement;
export type FaceDescriptor = WithFaceDescriptor<WithFaceLandmarks<{ detection: FaceDetection }, FaceLandmarks68>>;

export interface PipelineData {
    readonly video: VideoFeed;
    readonly canvas: CanvasType;
    readonly videoWidth: number,
    readonly videoHeight: number,
    facesDetected: FaceDescriptor[];
    labeledDescriptors: LabeledFaceDescriptors[];
}

/**
 * Takes in input data, configures facial recognition, and draws the output
 * Does not return any output
 * @param data (PipelineData): Object that contains data for computing facial recognition
 * @returns Promise<void>
 */
export const runPipeline = async ({ video, canvas, videoWidth, videoHeight, facesDetected, labeledDescriptors }: PipelineData) => {
    try {
        const dimensions: IDimensions = { width: videoWidth, height: videoHeight };
        facesDetected = await detectAllFaces(video, new TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

        if (facesDetected.length < 1) {
            return;
        }

        matchDimensions(canvas, dimensions);
        facesDetected = resizeResults(facesDetected, dimensions);

        updateLabeledDescriptors(labeledDescriptors, facesDetected);

        const faceMatcher = new FaceMatcher(labeledDescriptors);

        const labeledMatches = facesDetected.map((labeledMatch: FaceDescriptor) => {
        return faceMatcher.findBestMatch(labeledMatch.descriptor);
        });

        labeledMatches.forEach((labeledMatch: FaceMatch, index: number) => {
            const detectedBox = facesDetected[index].detection.box;
            const label = labeledMatch.label;
            const drawNewBox = new draw.DrawBox(detectedBox, {
                boxColor: label,
                label: label,
            });
            drawNewBox.draw(canvas);
        });
    } catch (error) {
        console.error('Error while running pipeline - ', error);
    }
}
