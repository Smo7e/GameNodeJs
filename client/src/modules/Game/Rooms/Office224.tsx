import Chair from "../RoomObjects/Chair";
import Decoration from "../RoomObjects/Decoration";
import Table from "../RoomObjects/Table";
import Wall from "../RoomObjects/Wall";

const Office424: React.FC = () => (
    <>
        {/* Левая Нижняя Комната */}
        {/* Стены */}
        <Wall position={[-14, -21.7, 0]} args={[20, 0.5, 1]} />
        <Wall position={[-14, -7, 0]} args={[20, 0.5, 1]} />
        <Wall position={[-24.1, -14.3, 0]} args={[0.5, 14, 1]} />

        {/* Парты */}
        {/* Верхний Ряд */}
        <Table position={[-6.9, -10.1, -1]} type={"table6"} />
        <Table position={[-9.8, -10, -1]} type={"table6"} />
        <Table position={[-12.8, -10, -1]} type={"table6"} />
        <Table position={[-15.6, -10, -1]} type={"table6"} />
        <Table position={[-18.7, -10, -1]} type={"table6"} />
        <Table position={[-20, -10.2, -1]} type={"table6"} />

        {/* Средний Ряд */}
        <Table position={[-6.9, -14.2, -1]} type={"table6"} />
        <Table position={[-9.8, -14.2, -1]} type={"table6"} />
        <Table position={[-12.8, -14.2, -1]} type={"table6"} />
        <Table position={[-15.6, -14.2, -1]} type={"table6"} />
        <Table position={[-18.7, -14.2, -1]} type={"table6"} />
        <Table position={[-20, -14.2, -1]} type={"table6"} />

        {/* Нижний Ряд */}
        <Table position={[-9.8, -18.4, -1]} type={"table6"} />
        <Table position={[-12.8, -18.4, -1]} type={"table6"} />
        <Table position={[-15.6, -18.4, -1]} type={"table6"} />
        <Table position={[-18.8, -18.4, -1]} type={"table6"} />

        {/* Стулья */}

        {/* Верхний Ряд */}
        <Chair position={[-5.9, -10.6, -1]} type={"chair2"} />
        <Chair position={[-5.9, -9.3, -1]} type={"chair2"} />
        <Chair position={[-8.8, -10.6, -1]} type={"chair2"} />
        <Chair position={[-8.8, -9.3, -1]} type={"chair2"} />
        <Chair position={[-11.8, -10.6, -1]} type={"chair2"} />
        <Chair position={[-11.8, -9.3, -1]} type={"chair2"} />
        <Chair position={[-14.6, -10.6, -1]} type={"chair2"} />
        <Chair position={[-14.6, -9.3, -1]} type={"chair2"} />
        <Chair position={[-17.7, -10.6, -1]} type={"chair2"} />
        <Chair position={[-17.7, -9.3, -1]} type={"chair2"} />
        <Chair position={[-21, -10.6, -1]} type={"chair1"} />

        {/* Средний Ряд */}
        <Chair position={[-5.9, -14.6, -1]} type={"chair2"} />
        <Chair position={[-5.9, -13.3, -1]} type={"chair2"} />
        <Chair position={[-8.8, -14.6, -1]} type={"chair2"} />
        <Chair position={[-8.8, -13.3, -1]} type={"chair2"} />
        <Chair position={[-11.8, -14.6, -1]} type={"chair2"} />
        <Chair position={[-11.8, -13.3, -1]} type={"chair2"} />
        <Chair position={[-14.6, -14.6, -1]} type={"chair2"} />
        <Chair position={[-14.6, -13.3, -1]} type={"chair2"} />
        <Chair position={[-17.7, -14.6, -1]} type={"chair2"} />
        <Chair position={[-17.7, -13.3, -1]} type={"chair2"} />

        {/* Нижний Ряд */}
        <Chair position={[-8.8, -18.8, -1]} type={"chair2"} />
        <Chair position={[-8.8, -17.5, -1]} type={"chair2"} />
        <Chair position={[-11.8, -18.8, -1]} type={"chair2"} />
        <Chair position={[-11.8, -17.5, -1]} type={"chair2"} />
        <Chair position={[-14.6, -18.8, -1]} type={"chair2"} />
        <Chair position={[-14.6, -17.5, -1]} type={"chair2"} />
        <Chair position={[-17.7, -18.8, -1]} type={"chair2"} />
        <Chair position={[-17.7, -17.5, -1]} type={"chair2"} />

        {/* Декор */}
        <Decoration position={[-22, -7.5, -1]} type={"wardrobe2"} />
    </>
);

export default Office424;
