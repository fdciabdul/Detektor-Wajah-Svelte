/**
 * Generates a random color hex value
 * @returns string: Randomized color hex value
 */
export const generateColorHex: () => string = () => {
    let hexString: string = '#';
    let randomNum: number;

    for (let index = 1; index < 7; index++) {
        randomNum = Math.floor(Math.random() * 15);

        if (randomNum < 10) {
            hexString = hexString.concat(randomNum.toString(10)); 
        } else {
            switch (randomNum) {
                case 10:
                    hexString = hexString.concat('A');
                    break;
                case 11:
                    hexString = hexString.concat('B');
                    break;
                case 12:
                    hexString = hexString.concat('C');
                    break;
                case 13:
                    hexString = hexString.concat('D');
                    break;
                case 14:
                    hexString = hexString.concat('E');
                    break;
                case 15:
                    hexString = hexString.concat('F');
                    break;
                default:
                    break;
            };
        };
    };

    if (hexString.length !== 7) {
        return '#FFFFFF';
    };

    return hexString;
};