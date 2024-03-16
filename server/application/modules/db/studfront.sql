PGDMP      !                |         	   studfront    16.2    16.2 H    F           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            G           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            H           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            I           1262    16398 	   studfront    DATABASE     }   CREATE DATABASE studfront WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE studfront;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            J           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    16420    game    TABLE     �  CREATE TABLE public.game (
    id integer NOT NULL,
    version character varying(256) NOT NULL,
    chat_hash character varying(256) NOT NULL,
    gamers_hash character varying(256) NOT NULL,
    items_hash character varying(256) NOT NULL,
    mobs_hash character varying(256) NOT NULL,
    update_timestamp integer DEFAULT 0 NOT NULL,
    update_timeout integer DEFAULT 300 NOT NULL
);
    DROP TABLE public.game;
       public         heap    postgres    false    4            �            1259    16419    game_id_seq    SEQUENCE     �   CREATE SEQUENCE public.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.game_id_seq;
       public          postgres    false    218    4            K           0    0    game_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;
          public          postgres    false    217            �            1259    16431    gamers    TABLE     �  CREATE TABLE public.gamers (
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
    DROP TABLE public.gamers;
       public         heap    postgres    false    4            �            1259    16430    gamers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.gamers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.gamers_id_seq;
       public          postgres    false    220    4            L           0    0    gamers_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.gamers_id_seq OWNED BY public.gamers.id;
          public          postgres    false    219            �            1259    16445    gamers_items    TABLE     �   CREATE TABLE public.gamers_items (
    id bigint NOT NULL,
    item_id bigint,
    gamer_id bigint,
    status character varying(20),
    x double precision,
    y double precision
);
     DROP TABLE public.gamers_items;
       public         heap    postgres    false    4            �            1259    16444    gamers_items_id_seq    SEQUENCE     |   CREATE SEQUENCE public.gamers_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.gamers_items_id_seq;
       public          postgres    false    4    222            M           0    0    gamers_items_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.gamers_items_id_seq OWNED BY public.gamers_items.id;
          public          postgres    false    221            �            1259    16454    invitations    TABLE     {   CREATE TABLE public.invitations (
    id integer NOT NULL,
    id_who integer NOT NULL,
    id_to_whom integer NOT NULL
);
    DROP TABLE public.invitations;
       public         heap    postgres    false    4            �            1259    16453    invitations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.invitations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.invitations_id_seq;
       public          postgres    false    4    224            N           0    0    invitations_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.invitations_id_seq OWNED BY public.invitations.id;
          public          postgres    false    223            �            1259    16461    items    TABLE       CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    type character varying(50) NOT NULL,
    location character varying(255) NOT NULL,
    image character varying(100) NOT NULL,
    description character varying(255) NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false    4            �            1259    16460    items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.items_id_seq;
       public          postgres    false    226    4            O           0    0    items_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;
          public          postgres    false    225            �            1259    16470    messages    TABLE     �   CREATE TABLE public.messages (
    id integer NOT NULL,
    user_id integer NOT NULL,
    message character varying(256) NOT NULL,
    created timestamp without time zone NOT NULL
);
    DROP TABLE public.messages;
       public         heap    postgres    false    4            �            1259    16469    messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public          postgres    false    4    228            P           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
          public          postgres    false    227            �            1259    16477    mobs    TABLE     �   CREATE TABLE public.mobs (
    id integer NOT NULL,
    x double precision DEFAULT 0 NOT NULL,
    y double precision DEFAULT 0 NOT NULL,
    status character varying(256) NOT NULL,
    hp integer DEFAULT 120 NOT NULL
);
    DROP TABLE public.mobs;
       public         heap    postgres    false    4            �            1259    16476    mobs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.mobs_id_seq;
       public          postgres    false    230    4            Q           0    0    mobs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.mobs_id_seq OWNED BY public.mobs.id;
          public          postgres    false    229            �            1259    16487    questions_programmer    TABLE     Q  CREATE TABLE public.questions_programmer (
    id integer NOT NULL,
    question character varying(255) NOT NULL,
    answer_1 character varying(255) NOT NULL,
    answer_2 character varying(255) NOT NULL,
    answer_3 character varying(255) NOT NULL,
    answer_4 character varying(255) NOT NULL,
    correct_answer integer NOT NULL
);
 (   DROP TABLE public.questions_programmer;
       public         heap    postgres    false    4            �            1259    16486    questions_programmer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions_programmer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.questions_programmer_id_seq;
       public          postgres    false    4    232            R           0    0    questions_programmer_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.questions_programmer_id_seq OWNED BY public.questions_programmer.id;
          public          postgres    false    231            �            1259    16400    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    name character varying(256) NOT NULL,
    token character varying(256),
    friends jsonb DEFAULT '[]'::jsonb NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16399    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    4    216            S           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            z           2604    16423    game id    DEFAULT     b   ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);
 6   ALTER TABLE public.game ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            }           2604    16434 	   gamers id    DEFAULT     f   ALTER TABLE ONLY public.gamers ALTER COLUMN id SET DEFAULT nextval('public.gamers_id_seq'::regclass);
 8   ALTER TABLE public.gamers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    16448    gamers_items id    DEFAULT     r   ALTER TABLE ONLY public.gamers_items ALTER COLUMN id SET DEFAULT nextval('public.gamers_items_id_seq'::regclass);
 >   ALTER TABLE public.gamers_items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16457    invitations id    DEFAULT     p   ALTER TABLE ONLY public.invitations ALTER COLUMN id SET DEFAULT nextval('public.invitations_id_seq'::regclass);
 =   ALTER TABLE public.invitations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    16464    items id    DEFAULT     d   ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);
 7   ALTER TABLE public.items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    16473    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    16480    mobs id    DEFAULT     b   ALTER TABLE ONLY public.mobs ALTER COLUMN id SET DEFAULT nextval('public.mobs_id_seq'::regclass);
 6   ALTER TABLE public.mobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            �           2604    16490    questions_programmer id    DEFAULT     �   ALTER TABLE ONLY public.questions_programmer ALTER COLUMN id SET DEFAULT nextval('public.questions_programmer_id_seq'::regclass);
 F   ALTER TABLE public.questions_programmer ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232            x           2604    16403    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            5          0    16420    game 
   TABLE DATA           |   COPY public.game (id, version, chat_hash, gamers_hash, items_hash, mobs_hash, update_timestamp, update_timeout) FROM stdin;
    public          postgres    false    218   oO       7          0    16431    gamers 
   TABLE DATA           _   COPY public.gamers (id, user_id, person_id, status, x, y, direction, hp, movement) FROM stdin;
    public          postgres    false    220   �O       9          0    16445    gamers_items 
   TABLE DATA           K   COPY public.gamers_items (id, item_id, gamer_id, status, x, y) FROM stdin;
    public          postgres    false    222   8P       ;          0    16454    invitations 
   TABLE DATA           =   COPY public.invitations (id, id_who, id_to_whom) FROM stdin;
    public          postgres    false    224   UP       =          0    16461    items 
   TABLE DATA           M   COPY public.items (id, name, type, location, image, description) FROM stdin;
    public          postgres    false    226   |P       ?          0    16470    messages 
   TABLE DATA           A   COPY public.messages (id, user_id, message, created) FROM stdin;
    public          postgres    false    228   �T       A          0    16477    mobs 
   TABLE DATA           4   COPY public.mobs (id, x, y, status, hp) FROM stdin;
    public          postgres    false    230   %U       C          0    16487    questions_programmer 
   TABLE DATA           t   COPY public.questions_programmer (id, question, answer_1, answer_2, answer_3, answer_4, correct_answer) FROM stdin;
    public          postgres    false    232   qU       3          0    16400    users 
   TABLE DATA           J   COPY public.users (id, login, password, name, token, friends) FROM stdin;
    public          postgres    false    216   na       T           0    0    game_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.game_id_seq', 1, true);
          public          postgres    false    217            U           0    0    gamers_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.gamers_id_seq', 25, true);
          public          postgres    false    219            V           0    0    gamers_items_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.gamers_items_id_seq', 1, false);
          public          postgres    false    221            W           0    0    invitations_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invitations_id_seq', 1, false);
          public          postgres    false    223            X           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 1, false);
          public          postgres    false    225            Y           0    0    messages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.messages_id_seq', 1, false);
          public          postgres    false    227            Z           0    0    mobs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.mobs_id_seq', 1, false);
          public          postgres    false    229            [           0    0    questions_programmer_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.questions_programmer_id_seq', 1, false);
          public          postgres    false    231            \           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 13, true);
          public          postgres    false    215            �           2606    16429    game game_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.game DROP CONSTRAINT game_pkey;
       public            postgres    false    218            �           2606    16450    gamers_items gamers_items_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.gamers_items
    ADD CONSTRAINT gamers_items_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.gamers_items DROP CONSTRAINT gamers_items_pkey;
       public            postgres    false    222            �           2606    16443    gamers gamers_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.gamers
    ADD CONSTRAINT gamers_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.gamers DROP CONSTRAINT gamers_pkey;
       public            postgres    false    220            �           2606    16459    invitations invitations_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT invitations_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.invitations DROP CONSTRAINT invitations_pkey;
       public            postgres    false    224            �           2606    16468    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    226            �           2606    16475    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    228            �           2606    16485    mobs mobs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.mobs
    ADD CONSTRAINT mobs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.mobs DROP CONSTRAINT mobs_pkey;
       public            postgres    false    230            �           2606    16494 .   questions_programmer questions_programmer_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.questions_programmer
    ADD CONSTRAINT questions_programmer_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.questions_programmer DROP CONSTRAINT questions_programmer_pkey;
       public            postgres    false    232            �           2606    16408    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           1259    16452    gamer_id_index    INDEX     K   CREATE INDEX gamer_id_index ON public.gamers_items USING btree (gamer_id);
 "   DROP INDEX public.gamer_id_index;
       public            postgres    false    222            �           1259    16411 	   idx_login    INDEX     C   CREATE UNIQUE INDEX idx_login ON public.users USING btree (login);
    DROP INDEX public.idx_login;
       public            postgres    false    216            �           1259    16451    item_id_index    INDEX     I   CREATE INDEX item_id_index ON public.gamers_items USING btree (item_id);
 !   DROP INDEX public.item_id_index;
       public            postgres    false    222            5   a   x���! ��(�Q���8�	�%���EGJvL�R=1����n$�0��D��6!3��a��#@�'t��N�`�)�cϹߙ{���2�q��Z���L      7   H   x��˹�0��T�G>=��8p��ڧ6_:���gA�J��u�Fd�*����x�Q���{6� {��      9      x������ � �      ;      x�3�4�4�2�4�1z\\\ N$      =   �  x��U�r�f�O�0�$����t c�!� �x�3H��g�+(IO��w���io;Cb����WX�B����I�	N�Mn���}�~�b)�F�
��C�o>�)����C8�����R�M���Ɔ\/��%U-�%��ђ�,��f7"��\�+D�jJ�E�\P-��<���?���1������`H��p�էfQ�2���I�:i0������#zx|i��/�� $����I/������v��'X�XP�cީf�(����}[�i�oX$�	��+LC/�m����Ֆ��$�eї�ťB@�Z�p6���|�Q
~����/��>����U��p+�Ul�4�`�q]v/�.7.q[���ɴ�*�D���s`��pS�u�����?��O�tED@�H�1�(�#$y�M�����$^J'��:9����m!�y�9��[�j�ٕ#�Et, �I�G��>���wR�~50�$Y���x�t{Y��5:1^L�Jީ�YM�eb��9����|�����8z�F�qb8��ag�S�Y��l_?Gd��\<��9�uii�R7);���&���x1[��^�UX1���|�(}���ΘѨ#��D����x�fP�|�&s2B&$�0���iO��1�B6��Q�p�#K�J��'�BQ��<2����y�$����[��~���H���V�;f�tH�w�d��y(�3=&��M�Z�C��\U&2~���F��~��ݩ-���0��W���Ü��p�|�|�N�&�0�D9�yl-��ܚ~��KI�B@��É�LK����9HE8Ms��ٯ��߮n,\�,C|z1Y�#Bp23.v��~Ґ&+��i�\�arT�����QAQ+�������in ����
z6����k���K��� U|��/�2Js���x/α�0 ����S�����a7[����;�(��W�h�c�U���Z+�i��vZ���3��-Aw��]-�KM�v)��^�ܜٿ^��l�諾[      ?   �   x�e�=�0�9>Ez���N
�YX���3 So!����s#UT�����e4�ġ$�q�آ��z!d��S��:0p��ߩ�Ø�;�����ޭ.:�o͗Eq� ��|ѤO�V6E��d/.@W�ʣ�r/_5�������8yD�      A   <   x�3��30� KcC#sCN]K=sC3CS#3c3s#�Ĝ̲TNC�=... &�
�      C   �  x��ZmO�X�L~���HD�f��A1���j���Q����Xk���2�xi���-��~�Vݑ�]�_�CI��?��{�؉��H#$����=���<�����U��w|O	v�:.΂�`�����������σ�i��{�&)�1���\;X������|<��Np�9�t��>�=����'�h2��`oU,���aڜף���޷��R�ˆk��@>������e���Kӟ�g�(�Lu{`,��+�7�S�������oX�df=�sYj�L�Ƒ.ַ��'M@����u<�=+1�[w0W�(�TWP�;�0�r���>���h]
!ژ�bE�E>`s: HH��UX�D���X<8$=�L=���R��p9�=�
ǈ��!���`�Ϭ)����Y]�]�������|��������[V�#���x��l"nb���z�󙱮/�I?�/<;�M5��6&��!��5 |�W���~� <a�w���
��e'L��0��.�O���#3��+��oT��UWM������@$���%㋸0+�Mï+H1.x�:��J4���x���'���m\�B��Ex��@\ �elJs�*Mf&�ԘmN$1a��<���=�?c~(;Er�G_#H��K+�j���2���Y���8�'�ΐT���1^@!H��J�� �� [�{<tT�U��tg��n�:I�ٮ�k�ݰʺ���,/[�`�T��xvݱ�-�Հ��<��J�K��.#�*�����,�s�Tr>�7�T=>����V�-�T��%�"�H����,�Gz٦��ٵJq�l�P���ZPH����̭kţ���uF�@��-̑~�>�틶��J���:�T�u�D�+�iX��x��`\nr�c�~�����yI�丧lꚡ*?Ut��ˤ��-Tӄ[�Q��ْc@��Ln4��q�ó�ą�C��y|v�n�!�]�x.� ߔ���]�i�T�↮��mz5[[םU��fK�Z�(U����Nq��0��W�;�#/��? ��4�E���N�B���;[l���F�|�gx(�{ѡ�+T��<��"� ^�e�9���|�|�����0\QRqt�s�t� ���o9	������l�*?���Sc�3�ٽ�$�f�l�Gǘ���~��:Y�	�x[.&��s��9�N�P��}�	^$��:��9rɆ�w۰.<3nFy]��)ڛ%�L��¬�\*i�K���h�撵ɳ�{���LyĻ� ٚd?e��艛M
忁�$����$�r�|b">�OOi\\�E��9f�MLe�0o�pn��:�����/9v������5���R��\�*;�wy%�6U^v�7!��z�Ad�*��,�}]2m'r��K\j��}B�K��5o���V��u[x����HɍvE��*�*ec^y��[B zmӼ4�j�1�k)���5��0':>V'�n�Wh����N��K	4�M�)H�y������$ ��?n��[�N7'��xʢpSߴd9]�*gw�弌���0� U�L��-���!b���M�, �N/�&�@i����R���	ê�2W ����a�iבx^5V�\��א�&�#!�U�G�=lT�*t"ީ���C�q+�I7Y�V��js�#�Va�bSK�s�4g�$����A�I�����IN!Uz4�4�Gj1ϮfMS��Vyre�&-�1J�#h���{N@"�\����pl'��JH�xQ��g|���NbV�$�$��WENH��R�.�E�(��P�Blxl���D�iU��b4N���Y�^r��R:,�]�gdr\*uE�ť/�}d���z�V��qCo���}��Ǿw�S�G,�UA��+������Ht��T�A�-�!�o%ʐ�D@�ysX�e��`����H������*�ë��.^<���dǥ�6���I��!�*����8*�-�S]�^t���I��c�&i��땰�A��v ��yaߔR���? �m�۸LFp̫K�A4�"�`�Wt2��J�AT�D>֒��>ſ����җdG�HFd�U�E�&Z��(���S�ػ瀣~r(zt��>;�8N5�V~�����AFG����&�E~��vN�=c�r��>�3�2U�U��ޒd���`�D^$�����&�	�N:��=Q��R��_��K�O�R2u��e��5{,ḁ�%��#���t�)`�oEH/n�JnT�LW>'��F?'p��oH\X��F�dE�9s9����q�G��ߛ��^�G�0m�1�n"��B=B<n�F���c;+����3�9?)�%�Z{�}�(�V�W�[+k�H��J���d;�a�R�O+�` B�.��"���!`Ao�>G7'�y��GG��x ��ssl/q��e�)�_��>�!�Ě�3��Э��$h1P[�z�f��I�	f�q��v�EK�:�,�Ҷ��"��C���5Ɍ��L��o��)9�;ב�DaӰ,�!\$:�I>��L�@�s�Ԣ��l�l��Eb���f���X��'�/�3����_)�;��m�����F��e?�~C�ͷԅĄGÛÚr�q��;L���A��BW\cS���co�X�
�L���e$E���xc��3���o&zG�I�0?̇��9��1Mc���pN{?޵���c����Z��% �6
������ej �J(w�=-��WikFR�A7��؇"V�*=�G�DL|��gC��.N/�dK�S��i�C����H�)\a�}u3��~�1'��q7�-�-L!dL��f��873�"���͒�?,�-�+�="�����Rߺ��ѭ��39�R����#��󍞏\��B��({�{׊�nr�0�07�&��? aK�wa����~a������c���	�Ԙ=H�A����@_.#�,���x�e���ii���Y,��,c��p����"�G>��ћ)e�ׂ����sS3�?JB|�~az�d�{or���Y�d2��kV�      3     x�E�9n�0Ek�>���d!E�Ti<.D-H��`��>��HA� ��$�W��̀��rL��ߟ����}bx�׷�;� D�5zI�s7�*����2u���q\�W��K�5����4H�w�!�3G�d�u�ݰࡹ# ��u J�J�j(A��d���U������?~6ZfYf]��i��bi�� I��B��z�q����<������g	��#�*����Xb����)j��[N��Q�)Z^�U�*��A7q�.�4�D�c�     