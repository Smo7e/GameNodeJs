type vect2 = { x: number; y: number };
type IPositionMatrix = vect2[][];

const usePositionMatrix = (mobName: string): IPositionMatrix => {
    switch (mobName) {
        case "trusov":
            return [
                [
                    { x: 8, y: -3 },
                    { x: 12, y: -3 },
                    { x: 15.8, y: -3 },
                ],
                [
                    { x: 8, y: -8.02 },
                    { x: 12, y: -8.02 },
                    { x: 15.8, y: -8.02 },
                ],
                [
                    { x: 8, y: -10.4 },
                    { x: 12, y: -10.4 },
                    { x: 15.8, y: -10.4 },
                ],
                [
                    { x: 8, y: -12.9 },
                    { x: 12, y: -12.9 },
                    { x: 15.8, y: -12.9 },
                ],
                [
                    { x: 8, y: -15.5 },
                    { x: 12, y: -15.5 },
                    { x: 15.8, y: -15.5 },
                ],
                [
                    { x: 8, y: -18.3 },
                    { x: 12, y: -18.3 },
                    { x: 15.8, y: -18.3 },
                ],
                [
                    { x: 8, y: -22 },
                    { x: 12, y: -22 },
                    { x: 15.8, y: -22 },
                ],
            ];
        case "rusanova":
            return [
                [
                    { x: -22, y: -12 },
                    { x: -16.84, y: -12 },
                    { x: -14, y: -12 },
                    { x: -11, y: -12 },
                    { x: -8, y: -12 },
                    { x: -5, y: -12 },
                ],
                [
                    { x: -22, y: -16.5 },
                    { x: -16.84, y: -16.5 },
                    { x: -14, y: -16.5 },
                    { x: -11, y: -16.5 },
                    { x: -8, y: -16.5 },
                    { x: -5, y: -16.5 },
                ],
                [
                    { x: -22, y: -20.5 },
                    { x: -16.84, y: -20.5 },
                    { x: -14, y: -20.5 },
                    { x: -11, y: -20.5 },
                    { x: -8, y: -20.5 },
                    { x: -5, y: -20.5 },
                ],
            ];

        default:
            return [[{ x: 0, y: 0 }]];
    }
};
export default usePositionMatrix;
