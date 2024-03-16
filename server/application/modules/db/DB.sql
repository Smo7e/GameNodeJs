--
-- PostgreSQL database cluster dump
--

-- Started on 2024-03-16 15:53:00

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:QWObMzETjSGaVGTPSsXK6A==$NJqOJZ5jR2wM2oHul3XPmv2KX2YrkF+qqX8oHiOSSeg=:CvJtYlnyS33JGoY94zKYO2s78mFie3jujL1ZU5ePoQw=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-16 15:53:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-03-16 15:53:00

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-16 15:53:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4832 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


-- Completed on 2024-03-16 15:53:00

--
-- PostgreSQL database dump complete
--

--
-- Database "studfront" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-16 15:53:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4937 (class 1262 OID 16398)
-- Name: studfront; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE studfront WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


ALTER DATABASE studfront OWNER TO postgres;

\connect studfront

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16420)
-- Name: game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game (
    id integer NOT NULL,
    version character varying(256) NOT NULL,
    chat_hash character varying(256) NOT NULL,
    gamers_hash character varying(256) NOT NULL,
    items_hash character varying(256) NOT NULL,
    mobs_hash character varying(256) NOT NULL,
    update_timestamp integer DEFAULT 0 NOT NULL,
    update_timeout integer DEFAULT 300 NOT NULL
);


ALTER TABLE public.game OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16419)
-- Name: game_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.game_id_seq OWNER TO postgres;

--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 217
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;


--
-- TOC entry 220 (class 1259 OID 16431)
-- Name: gamers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gamers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    person_id integer DEFAULT 0 NOT NULL,
    status character varying(256) DEFAULT 'alive'::character varying NOT NULL,
    x double precision DEFAULT 0 NOT NULL,
    y double precision DEFAULT 0 NOT NULL,
    direction character varying(256) DEFAULT 'down'::character varying NOT NULL,
    hp integer DEFAULT 100 NOT NULL,
    movement integer DEFAULT 5 NOT NULL
);


ALTER TABLE public.gamers OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16430)
-- Name: gamers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gamers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gamers_id_seq OWNER TO postgres;

--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 219
-- Name: gamers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gamers_id_seq OWNED BY public.gamers.id;


--
-- TOC entry 222 (class 1259 OID 16445)
-- Name: gamers_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gamers_items (
    id bigint NOT NULL,
    item_id bigint,
    gamer_id bigint,
    status character varying(20),
    x double precision,
    y double precision
);


ALTER TABLE public.gamers_items OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16444)
-- Name: gamers_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gamers_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gamers_items_id_seq OWNER TO postgres;

--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 221
-- Name: gamers_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gamers_items_id_seq OWNED BY public.gamers_items.id;


--
-- TOC entry 224 (class 1259 OID 16454)
-- Name: invitations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invitations (
    id integer NOT NULL,
    id_who integer NOT NULL,
    id_to_whom integer NOT NULL
);


ALTER TABLE public.invitations OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16453)
-- Name: invitations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invitations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invitations_id_seq OWNER TO postgres;

--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 223
-- Name: invitations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invitations_id_seq OWNED BY public.invitations.id;


--
-- TOC entry 226 (class 1259 OID 16461)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    type character varying(50) NOT NULL,
    location character varying(255) NOT NULL,
    image character varying(100) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16460)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_id_seq OWNER TO postgres;

--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 225
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- TOC entry 228 (class 1259 OID 16470)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    user_id integer NOT NULL,
    message character varying(256) NOT NULL,
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16469)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 227
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 230 (class 1259 OID 16477)
-- Name: mobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mobs (
    id integer NOT NULL,
    x double precision DEFAULT 0 NOT NULL,
    y double precision DEFAULT 0 NOT NULL,
    status character varying(256) NOT NULL,
    hp integer DEFAULT 120 NOT NULL
);


ALTER TABLE public.mobs OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16476)
-- Name: mobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mobs_id_seq OWNER TO postgres;

--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 229
-- Name: mobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mobs_id_seq OWNED BY public.mobs.id;


--
-- TOC entry 232 (class 1259 OID 16487)
-- Name: questions_programmer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions_programmer (
    id integer NOT NULL,
    question character varying(255) NOT NULL,
    answer_1 character varying(255) NOT NULL,
    answer_2 character varying(255) NOT NULL,
    answer_3 character varying(255) NOT NULL,
    answer_4 character varying(255) NOT NULL,
    correct_answer integer NOT NULL
);


ALTER TABLE public.questions_programmer OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16486)
-- Name: questions_programmer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_programmer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_programmer_id_seq OWNER TO postgres;

--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 231
-- Name: questions_programmer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_programmer_id_seq OWNED BY public.questions_programmer.id;


--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    name character varying(256) NOT NULL,
    token character varying(256),
    friends jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4730 (class 2604 OID 16423)
-- Name: game id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 16434)
-- Name: gamers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gamers ALTER COLUMN id SET DEFAULT nextval('public.gamers_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 16448)
-- Name: gamers_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gamers_items ALTER COLUMN id SET DEFAULT nextval('public.gamers_items_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 16457)
-- Name: invitations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitations ALTER COLUMN id SET DEFAULT nextval('public.invitations_id_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 16464)
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 16473)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 16480)
-- Name: mobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mobs ALTER COLUMN id SET DEFAULT nextval('public.mobs_id_seq'::regclass);


--
-- TOC entry 4749 (class 2604 OID 16490)
-- Name: questions_programmer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions_programmer ALTER COLUMN id SET DEFAULT nextval('public.questions_programmer_id_seq'::regclass);


--
-- TOC entry 4728 (class 2604 OID 16403)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4917 (class 0 OID 16420)
-- Dependencies: 218
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game (id, version, chat_hash, gamers_hash, items_hash, mobs_hash, update_timestamp, update_timeout) FROM stdin;
1	1.0.0	f7b7838b7e99419f3517f44296651324	e923736115b9b5e73eea2f50bb371460		b8d31a4b21a8a7268e96ce5f62bfaecc	1710588653	300
\.


--
-- TOC entry 4919 (class 0 OID 16431)
-- Dependencies: 220
-- Data for Name: gamers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gamers (id, user_id, person_id, status, x, y, direction, hp, movement) FROM stdin;
24	6	0	alive	0.2538042664527893	2.756168842315674	walk	80	5
25	6	0	alive	0.2538042664527893	2.756168842315674	walk	80	5
\.


--
-- TOC entry 4921 (class 0 OID 16445)
-- Dependencies: 222
-- Data for Name: gamers_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gamers_items (id, item_id, gamer_id, status, x, y) FROM stdin;
\.


--
-- TOC entry 4923 (class 0 OID 16454)
-- Dependencies: 224
-- Data for Name: invitations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invitations (id, id_who, id_to_whom) FROM stdin;
5	5	6
6	7	6
\.


--
-- TOC entry 4925 (class 0 OID 16461)
-- Dependencies: 226
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, name, type, location, image, description) FROM stdin;
1	Пиво	Расходник	Багетница	https://drive.google.com/uc?id=1txKPVJl2qxHKfoTPNLb2Gof4Sb2_CJEp	Восстанавливает здоровье на 15 единиц, на время боя увеличивает максимальное здоровье на 20 единиц
2	Сосиска в тесте	Расходник	Багетница	https://drive.google.com/uc?id=1_Oh0szf4vo2Uadnup78RSiPBVqOceEHD	Восстанавливает здоровье на 15 единиц
3	Айфон	Гаджет	Программирование	https://drive.google.com/uc?id=1_1JOzhHE-A07iss6PFHKy6vSVpugUL0q	Увеличивает урон по “Программированию” на 15 единиц
4	Спортивки	Одежда	Физра	https://drive.google.com/uc?id=1NVcwa-CUL0unvHG2Ai3dRB4unnqtxdK7	Увеличивает постоянное здоровье на 15 единиц
5	Энергос	Расходник	Багетница	https://drive.google.com/uc?id=1zOmnG7A1hi2swN4PRdhb5zP_phY0NOec	Восстанавливает здоровье на 15 единиц, на время боя увеличивает максимальное здоровье на 20 единиц
6	Учебник	Расходник	Программирование, русский язык, математика, английский язык	https://drive.google.com/uc?id=1CcxSd3GCb92Krr4Of_iHkR82-iqm1PRV	Увеличивает урон по всем парам кроме “Физра” на 5 единиц
7	Сигареты	Расходник	Багетница	https://drive.google.com/uc?id=1w8Rg20Ee_N4WXohJtQ6wclGg3mXmjPzX	Уменьшает текущее здоровье на 20, но на время боя увеличивает урон каждой атаки на 10 
8	Кофта “Stone Island” 	Одежда	Физра	https://drive.google.com/uc?id=19xKs-LkbtI47TDBA22StocB-nvzkMaAv	Увеличивает максимальное здоровье на 15
9	Калькулятор	Гаджет	Математика	https://drive.google.com/uc?id=14HEzCbJRFXuc9p0AjPwlTK2pp3j43dCo	Увеличивает урон по “Математике” на 15 единиц
10	Словарь	Книга	Русский язык, английский язык	https://drive.google.com/uc?id=1Sms2iIUvf2aN3-EHdLz8-jMTyJLHhom0	Увеличивает урон по “Русскому языку” и “Английскому языку” на 10 единиц
11	Ноутбук	Гаджет	Математика, программирование	https://drive.google.com/uc?id=1AmXmAyEcvSGUK0gL70VDyx_nLIhT7GQI	Увеличивает урон по “Программированию” и “Математике” на 10 единиц
12	Багет	Расходник	Багетница	https://drive.google.com/uc?id=17LFVpq1h5V_HrYuHz6zbYpK3rcXpPBIY	 Восстанавливает здоровье на 25 единиц
\.


--
-- TOC entry 4927 (class 0 OID 16470)
-- Dependencies: 228
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, user_id, message, created) FROM stdin;
1	4	hahahha	2023-11-14 10:29:24
2	1	hihihi	2023-11-14 10:29:53
3	4	hohohohohooooo	2023-11-14 10:33:36
4	4	иди в попу!	2023-11-14 11:08:25
5	4	сам иди	2023-11-29 08:27:05
6	1	ща втащу!	2023-11-29 08:27:13
\.


--
-- TOC entry 4929 (class 0 OID 16477)
-- Dependencies: 230
-- Data for Name: mobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mobs (id, x, y, status, hp) FROM stdin;
1	8.038888931274414	-9.741680145263672	alive	100
\.


--
-- TOC entry 4931 (class 0 OID 16487)
-- Dependencies: 232
-- Data for Name: questions_programmer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions_programmer (id, question, answer_1, answer_2, answer_3, answer_4, correct_answer) FROM stdin;
1	Какое свойство CSS используется для управления порядком слоев элементов на веб-странице?	1) position	2) float	3) z-index	4) display	3
2	Какое из следующих утверждений о правильном использовании тегов <div> и <span> в языке HTML является верным?	1) <div> используется для стилизации отдельных элементов, а <span> - для группировки блоков контента.	2) <div> используется для группировки блоков контента, а <span> - для стилизации отдельных элементов.	3) Оба тега используются только для группировки блоков контента.	4) Оба тега используются только для стилизации отдельных элементов.	2
3	Какой тег HTML используется для создания нумерованного списка?	1)<ol>	2)<ul>	3)<li>	4)<dl>	1
4	Какой элемент HTML используется для создания таблицы?	a) <table>	b) <div>	c) <ul>	d) <p>	1
5	Какой атрибут HTML позволяет указать адрес внешнего ресурса, такого как изображение или файл стилей?	1) src	2) href	3) alt	4) class	2
6	Какой из приведённых вариантов не является допустимым значением свойства border-style?	1)dotted	2)inset\\r\\n	3)glazed	4)groove	3
7	В CSS есть 16 основных названий для цвета. Какое из перечисленных названий к ним не принадлежит?	1)olive	2)fuchsia	3)cyan	4)aqua	3
8	Какое из следующих свойств не влияет на модель box?	1)content	2)padding	3)margin	4)outline	4
9	Какой из перечисленных медиа типов не является допустимым для использования в media queries?	1)tv	2)all	3)voice	4)print	3
10	Какие из следующих цветов не были предложены в спецификации W3C?	1)blanchedalmond	2)dodgerblue	3)peachpuff	4)orchidblack	4
11	В React, что такое контролируемый компонент?	1) Компонент, управляемый асинхронными событиями	2) Компонент, управляемый входными данными пользователя	3) Компонент, управляемый серверными запросами	4) Компонент, управляемый внутренним состоянием React	4
12	Каким методом жизненного цикла следует пользоваться для выполнения сетевых запросов в React?	1) componentDidMount	2) componentDidUpdate	3) componentWillUnmount	4) componentWillMount	1
13	Что такое контекст (context) в React?	1) Механизм передачи данных через дерево компонентов без промежуточных передач через props	2) Функция, используемая для создания вложенных компонентов	3) Метод, позволяющий реализовать двустороннюю связь между компонентами	4) Стандартный объект, содержащий информацию о текущем состоянии приложения	1
14	Каким образом вы можете оптимизировать производительность React-компонентов?	1) Использовать мемоизацию и мемо-компоненты (memoized components)	2) Увеличить размер бандла, добавив больше стилей и изображений	3) Использовать больше классовых компонентов вместо функциональных компонентов	4) Избегать использования виртуального DOM (Virtual DOM)	1
15	Как можно передать данные от дочернего компонента к родительскому в React?	1) Используя контекст для глобальной передачи данных	2) Используя Redux для управления состоянием	3) Невозможно передать данные от дочернего компонента к родительскому	4) Используя коллбэк-функции, передаваемые через props	4
16	Какая из следующих операций в TypeScript используется для создания экземпляра класса?	1) create	2) new	3) instance	4) instantiate	2
17	В TypeScript, какой тип данных используется для указания отсутствия значения?	1) null	2) undefined	3) void	4) never	2
18	Какой модификатор доступа в TypeScript ограничивает доступ к свойствам и методам только внутри того же класса?	1) public	2) private	3) protected	4) internal	2
19	Для чего используется ключевое слово \\"readonly\\" в TypeScript?	1) Для создания константных свойств	2) Для указания, что переменную нельзя изменять после инициализации	3) Для ограничения доступа к свойству только для чтения	4) Все варианты ответов верны	4
20	Какой из следующих типов данных в TypeScript используется для представления массива значений определенного типа?	1) Array<T>	2) T[]	3) Set<T>	4) Tuple<T>	1
21	Какой будет результат выполнения следующего кода?\\r\\necho 10 % 4 + \\"10%4\\" + 10;	1) 20	2) 101010	3) 14	4) 1110	3
22	Какая функция PHP используется для установки обработчика ошибок?	1) set_error_handler()	2) set_exception_handler()	3) register_shutdown_function()	4) error_reporting()	1
23	Что такое \\"магические методы\\" в PHP?	1) Специальные методы, которые автоматически вызываются при определенных событиях.	2) Методы, которые могут генерировать случайные числа.	3) Методы, которые используются для работы с базами данных.	4) Методы, которые используются для манипуляции с файлами.	1
24	Какой вариант кода PHP будет выводить текущую дату и время в формате \\"ГГГГ-ММ-ДД ЧЧ:ММ:СС\\"?	1) echo now();	2) echo date(\\"Y-m-d H:i:s\\");	3) echo current_date_time();	4) echo datetime(\\"Y-m-d H:i:s\\");	2
25	Что делает функция PHP \\"header()\\"?	1) Отправляет HTTP-заголовок клиенту.	2) Отправляет запрос на другой сервер.	3) Создает новую переменную.	4) Изменяет значение переменной.	1
26	Какой оператор используется для добавления данных в таблицу?	1) INSERT	2) UPDATE	3) SELECT	4) DELETE	1
27	Какой оператор используется для объединения данных из нескольких таблиц?	1) JOIN	2) UNION	3) GROUP BY	4) ORDER BY	1
28	Каким образом можно удалить все строки из таблицы?	1) DELETE FROM table_name	2) DROP TABLE table_name	3) TRUNCATE TABLE table_name	4) REMOVE FROM table_name	3
29	Какой оператор используется для выборки уникальных значений из столбца?	1) UNIQUE	2) DISTINCT	3) UNIQUE VALUES	4) DISTINCT VALUES	2
30	Какой оператор используется для изменения данных в таблице?	1) MODIFY	2) UPDATE	3) ALTER	4) CHANGE	2
\.


--
-- TOC entry 4915 (class 0 OID 16400)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, password, name, token, friends) FROM stdin;
2	petya	123	Petya Petroff	\N	[]
3	masha	ebf191604221bd6bc7af3f959d41b5eb	Masha	e5b1f3fa1ee368b38248f4dad09b5bc6	[5]
5	12	78bf4f00f81a36b57950e239f1df91c1	12	\N	[]
1	vasya	4a2d247d0c05a4f798b0b03839d94cf0	Vasya Ivanoff	100	[2, 4, 5, 6, 7]
4	1	c51ce410c124a10e0db5e4b97fc2af39	100	100	[]
13	333	333	333	\N	[]
6	123	4297f44b13955235245b2497399d7a93	123	e73b3ea772e92fde1269a809d5bd425c	[4, 2, 1]
\.


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 217
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_id_seq', 1, true);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 219
-- Name: gamers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gamers_id_seq', 25, true);


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 221
-- Name: gamers_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gamers_items_id_seq', 1, false);


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 223
-- Name: invitations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invitations_id_seq', 1, false);


--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 225
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 1, false);


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 227
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 229
-- Name: mobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mobs_id_seq', 1, false);


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 231
-- Name: questions_programmer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_programmer_id_seq', 1, false);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- TOC entry 4754 (class 2606 OID 16429)
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- TOC entry 4759 (class 2606 OID 16450)
-- Name: gamers_items gamers_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gamers_items
    ADD CONSTRAINT gamers_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4756 (class 2606 OID 16443)
-- Name: gamers gamers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gamers
    ADD CONSTRAINT gamers_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 16459)
-- Name: invitations invitations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT invitations_pkey PRIMARY KEY (id);


--
-- TOC entry 4764 (class 2606 OID 16468)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 16475)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 16485)
-- Name: mobs mobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mobs
    ADD CONSTRAINT mobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 16494)
-- Name: questions_programmer questions_programmer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions_programmer
    ADD CONSTRAINT questions_programmer_pkey PRIMARY KEY (id);


--
-- TOC entry 4752 (class 2606 OID 16408)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4757 (class 1259 OID 16452)
-- Name: gamer_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gamer_id_index ON public.gamers_items USING btree (gamer_id);


--
-- TOC entry 4750 (class 1259 OID 16411)
-- Name: idx_login; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_login ON public.users USING btree (login);


--
-- TOC entry 4760 (class 1259 OID 16451)
-- Name: item_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX item_id_index ON public.gamers_items USING btree (item_id);


-- Completed on 2024-03-16 15:53:00

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-03-16 15:53:00

--
-- PostgreSQL database cluster dump complete
--

