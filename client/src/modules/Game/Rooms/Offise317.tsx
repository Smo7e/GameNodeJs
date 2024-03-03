import Chair from "../RoomObjects/Chair";
import Decoration from "../RoomObjects/Decoration";
import Table from "../RoomObjects/Table";
import Wall from "../RoomObjects/Wall";

const Office317: React.FC = () => (
    <>
        {/* Правая Нижняя Комната */}
        {/* Стены */}
        <Wall position={[10.4, -1.2, 0]} args={[12, 0.5, 1]} />
        <Wall position={[16.6, -12.4, 0]} args={[0.5, 22, 1]} />
        <Wall position={[10.4, -23.6, 0]} args={[12, 0.5, 1]} />

        {/* Парты */}
        {/* Левый Ряд */}
        <Table position={[5.5, -5.2, -1]} type={"table3"} />
        <Table position={[5.5, -7.75, -1]} type={"table3"} />
        <Table position={[5.5, -10.45, -1]} type={"table3"} />
        <Table position={[5.5, -13.35, -1]} type={"table3"} />
        <Table position={[5.5, -16.35, -1]} type={"table3"} />
        <Table position={[5.5, -19.7, -1]} type={"table3"} />

        {/* Средний Ряд */}
        <Chair position={[9.95, -4.2, -1]} type={"chair5"} />

        <Table position={[10, -6.3, -1]} type={"table2"} />
        <Table position={[10, -5.4, -1]} type={"table2"} />
        <Table position={[9.95, -8.85, -1]} type={"table2"} />
        <Table position={[9.95, -11.45, -1]} type={"table2"} />
        <Table position={[9.95, -13.9, -1]} type={"table2"} />
        <Table position={[10.06, -16.65, -1]} type={"table2"} />
        <Table position={[10.11, -19.3, -1]} type={"table2"} />

        {/* Правый Ряд */}

        <Chair position={[14, -4.1, -1]} type={"chair5"} />

        <Table position={[14.05, -5.1, -1]} type={"table4"} />
        <Table position={[14, -6.35, -1]} type={"table3"} />
        <Table position={[14.1, -8.75, -1]} type={"table3"} />
        <Table position={[14.1, -11.3, -1]} type={"table3"} />
        <Table position={[14.1, -13.7, -1]} type={"table3"} />
        <Table position={[14, -16.4, -1]} type={"table3"} />
        <Table position={[14, -19.2, -1]} type={"table3"} />

        {/* Стулья */}

        {/*Левый ряд*/}
        <Chair position={[5, -6.1, -1]} type={"chair4"} />
        <Chair position={[6, -6.1, -1]} type={"chair4"} />
        <Chair position={[5, -8.8, -1]} type={"chair4"} />
        <Chair position={[6, -8.8, -1]} type={"chair4"} />
        <Chair position={[5, -11.5, -1]} type={"chair4"} />
        <Chair position={[6, -11.5, -1]} type={"chair4"} />
        <Chair position={[5, -14.5, -1]} type={"chair4"} />
        <Chair position={[6, -14.5, -1]} type={"chair4"} />
        <Chair position={[5, -17.5, -1]} type={"chair4"} />
        <Chair position={[6, -17.5, -1]} type={"chair4"} />
        <Chair position={[5, -21, -1]} type={"chair4"} />
        <Chair position={[6, -21, -1]} type={"chair4"} />

        {/*Средний ряд*/}
        <Chair position={[9.5, -7.1, -1]} type={"chair4"} />
        <Chair position={[10.5, -7.1, -1]} type={"chair4"} />
        <Chair position={[9.5, -9.5, -1]} type={"chair4"} />
        <Chair position={[10.5, -9.5, -1]} type={"chair4"} />
        <Chair position={[9.5, -12.1, -1]} type={"chair4"} />
        <Chair position={[10.5, -12.1, -1]} type={"chair4"} />
        <Chair position={[9.5, -14.7, -1]} type={"chair4"} />
        <Chair position={[10.5, -14.7, -1]} type={"chair4"} />
        <Chair position={[9.5, -17.4, -1]} type={"chair4"} />
        <Chair position={[10.5, -17.4, -1]} type={"chair4"} />
        <Chair position={[9.5, -20.5, -1]} type={"chair4"} />
        <Chair position={[10.5, -20.5, -1]} type={"chair4"} />

        {/*Правый ряд*/}
        <Chair position={[13.5, -7, -1]} type={"chair4"} />
        <Chair position={[14.5, -7, -1]} type={"chair4"} />
        <Chair position={[13.5, -9.5, -1]} type={"chair4"} />
        <Chair position={[14.5, -9.5, -1]} type={"chair4"} />
        <Chair position={[13.5, -12, -1]} type={"chair4"} />
        <Chair position={[14.5, -12, -1]} type={"chair4"} />
        <Chair position={[13.5, -14.7, -1]} type={"chair4"} />
        <Chair position={[14.5, -14.7, -1]} type={"chair4"} />
        <Chair position={[13.5, -17.4, -1]} type={"chair4"} />
        <Chair position={[14.5, -17.4, -1]} type={"chair4"} />
        <Chair position={[13.5, -20.5, -1]} type={"chair4"} />
        <Chair position={[14.5, -20.5, -1]} type={"chair4"} />

        {/* Декор */}
        <Decoration position={[4.6, -2, -1]} type={"trashcan"} />
    </>
);

export default Office317;
