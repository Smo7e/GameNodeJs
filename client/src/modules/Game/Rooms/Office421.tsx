import Chair from "../RoomObjects/Chair";
import Decoration from "../RoomObjects/Decoration";
import Table from "../RoomObjects/Table";
import Wall from "../RoomObjects/Wall";

const Office421: React.FC = () => (
    <>
        {/* Правая Верхняя Комната */}
        {/* Стены */}
        <Wall position={[13, 17, 0]} args={[17, 0.5, 1]} />
        <Wall position={[24, 10, 0]} args={[0.5, 15, 1]} />
        <Wall position={[14, 2.2, 0]} args={[18, 0.5, 1]} />

        {/* Парты */}
        {/* верхний ряд */}
        <Table position={[6.5, 14.2, -1]} type={"table1"} />
        <Chair position={[5.5, 14.9, -1]} type={"chair1"} />
        <Chair position={[5.5, 13.5, -1]} type={"chair1"} />

        <Table position={[9.5, 14.2, -1]} type={"table1"} />
        <Chair position={[8.4, 14.9, -1]} type={"chair1"} />
        <Chair position={[8.4, 13.5, -1]} type={"chair1"} />

        <Table position={[12.2, 14.2, -1]} type={"table1"} />
        <Chair position={[11.2, 14.9, -1]} type={"chair1"} />
        <Chair position={[11.2, 13.5, -1]} type={"chair1"} />

        <Table position={[15.2, 14.2, -1]} type={"table1"} />
        <Chair position={[14.2, 14.9, -1]} type={"chair1"} />
        <Chair position={[14.2, 13.5, -1]} type={"chair1"} />

        <Table position={[18.2, 14.2, -1]} type={"table1"} />
        <Chair position={[17.2, 14.9, -1]} type={"chair1"} />
        <Chair position={[17.2, 13.5, -1]} type={"chair1"} />
        {/* средний ряд */}

        <Table position={[6.5, 9.5, -1]} type={"table1"} />
        <Chair position={[5.5, 10.2, -1]} type={"chair1"} />
        <Chair position={[5.5, 8.7, -1]} type={"chair1"} />

        <Table position={[9.5, 9.5, -1]} type={"table1"} />
        <Chair position={[8.5, 10.2, -1]} type={"chair1"} />
        <Chair position={[8.5, 8.7, -1]} type={"chair1"} />

        <Table position={[12.2, 9.5, -1]} type={"table1"} />
        <Chair position={[11.2, 10.2, -1]} type={"chair1"} />
        <Chair position={[11.2, 8.7, -1]} type={"chair1"} />

        <Table position={[15.2, 9.5, -1]} type={"table1"} />
        <Chair position={[14.2, 10.2, -1]} type={"chair1"} />
        <Chair position={[14.2, 8.7, -1]} type={"chair1"} />

        <Table position={[18.2, 9.5, -1]} type={"table1"} />
        <Chair position={[17.2, 10.2, -1]} type={"chair1"} />
        <Chair position={[17.2, 8.7, -1]} type={"chair1"} />

        <Table position={[19.5, 9.5, -1]} type={"table1"} />
        <Chair position={[20.5, 8.7, -1]} type={"chair3"} />

        {/* нижний ряд */}

        <Table position={[9.5, 5.6, -1]} type={"table1"} />
        <Chair position={[8.5, 6.3, -1]} type={"chair1"} />
        <Chair position={[8.5, 4.8, -1]} type={"chair1"} />

        <Table position={[12.2, 5.6, -1]} type={"table1"} />
        <Chair position={[11.2, 6.3, -1]} type={"chair1"} />
        <Chair position={[11.2, 4.8, -1]} type={"chair1"} />

        <Table position={[15.2, 5.6, -1]} type={"table1"} />
        <Chair position={[14.2, 6.3, -1]} type={"chair1"} />
        <Chair position={[14.2, 4.8, -1]} type={"chair1"} />

        <Table position={[18.2, 5.6, -1]} type={"table1"} />
        <Chair position={[17.2, 6.3, -1]} type={"chair1"} />
        <Chair position={[17.2, 4.8, -1]} type={"chair1"} />

        {/* Декор */}
        <Decoration position={[22.3, 16.5, -1]} type="wardrobe1" />
        <Decoration position={[4.8, 3.1, -1]} type="trashcan" />
    </>
);

export default Office421;
