import * as THREE from "three";
import spriteSportik from "../../Game/image/Persons/spriteSportik.png";
import spriteThetechguy from "../../Game/image/Persons/spriteThetechguy.png";
import spriteHumanities from "../../Game/image/Persons/spriteHumanities.png";
import spriteGolovizin from "../../Game/image/Persons/spriteGolovizin.png";
import spritePushkareva from "../../Game/image/Persons/spritePushkareva.png";
import spriteMajorova from "../../Game/image/Persons/spriteMajorova.png";
import spriteRusanova from "../../Game/image/Persons/spriteRusanova.png";
import spriteTrusov from "../../Game/image/Persons/spriteTrusov.png";

function useSprites(name: string) {
    const result = (url: string) => {
        const arr2 = [];
        for (let i = 0; i < 5; i++) {
            let arr: any = [];
            for (let j = 0; j < 9; j++) {
                let texture = new THREE.TextureLoader().load(url);
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1 / 9, 1 / 5);
                texture.offset.x = j / 9;
                texture.offset.y = i / 5;
                arr.push(texture);
            }
            arr2.push(arr);
        }
        return arr2;
    };
    switch (name) {
        case "0":
            return result(spriteSportik);
        case "1":
            return result(spriteThetechguy);
        case "2":
            return result(spriteHumanities);
        case "golovizin":
            return result(spriteGolovizin);
        case "pushkareva":
            return result(spritePushkareva);
        case "majorova":
            return result(spriteMajorova);
        case "rusanova":
            return result(spriteRusanova);
        case "trusov":
            return result(spriteTrusov);
        default:
            return result(spriteSportik);
    }
}
export default useSprites;
