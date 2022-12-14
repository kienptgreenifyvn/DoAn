PGDMP         	                z            QLDATN    13.4    13.4 9    
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    120810    QLDATN    DATABASE     l   CREATE DATABASE "QLDATN" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "QLDATN";
                postgres    false            ?            1259    184062    chudes    TABLE     ?   CREATE TABLE public.chudes (
    "IDchude" integer NOT NULL,
    tenchude text,
    ghichu text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.chudes;
       public         heap    postgres    false            ?            1259    184104    detais    TABLE     |  CREATE TABLE public.detais (
    "IDdetai" integer NOT NULL,
    tendetai text,
    thoigianbatdau timestamp with time zone,
    thoigianketthuc timestamp with time zone,
    "isActive" boolean,
    "isConfim" boolean,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "IDchude" integer,
    "IDhoidong" integer,
    "IDgiangvien" integer
);
    DROP TABLE public.detais;
       public         heap    postgres    false            ?            1259    184078    donvis    TABLE     ?   CREATE TABLE public.donvis (
    "IDdonvi" integer NOT NULL,
    tendonvi text,
    diachi text,
    sodienthoai integer,
    truongdonvi text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.donvis;
       public         heap    postgres    false            ?            1259    184086 
   giangviens    TABLE     ?  CREATE TABLE public.giangviens (
    "IDgiangvien" integer NOT NULL,
    tengiangvien text,
    gioitinh text,
    namsinh timestamp with time zone,
    sodienthoai integer,
    diachi text,
    hocvi text,
    chucvu text,
    "Khoa" text,
    anhgiangvien text,
    huongnghiencuu text,
    "isActive" boolean,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    id integer,
    "IDdonvi" integer
);
    DROP TABLE public.giangviens;
       public         heap    postgres    false            ?            1259    184070    hoidongs    TABLE     ?   CREATE TABLE public.hoidongs (
    "IDhoidong" integer NOT NULL,
    chutichhoidong text,
    sothanhvien integer,
    nhanxet text,
    diemhoidong double precision,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.hoidongs;
       public         heap    postgres    false            ?            1259    184127    lops    TABLE     ?   CREATE TABLE public.lops (
    "IDlop" integer NOT NULL,
    tenlop text,
    sosinhvien integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.lops;
       public         heap    postgres    false            ?            1259    184057    roles    TABLE     ?   CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            ?            1259    184135 	   sinhviens    TABLE     ?  CREATE TABLE public.sinhviens (
    "IDsinhvien" integer NOT NULL,
    tensinhvien text,
    gioitinh text,
    namsinh timestamp with time zone,
    quequan text,
    sodienthoai integer,
    sourcecode text,
    bacdaotao character varying(255),
    hedaotao character varying(255),
    khoadaotao character varying(255),
    diemtichluy character varying(255),
    kynang character varying(255),
    anhsinhvien character varying(255),
    "isActive" boolean,
    "isBook" boolean,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "IDdonvi" integer,
    id integer,
    "IDlop" integer,
    "IDdetai" integer,
    "IDgiangvien" integer
);
    DROP TABLE public.sinhviens;
       public         heap    postgres    false            ?            1259    184179 	   thongbaos    TABLE     ?   CREATE TABLE public.thongbaos (
    id integer NOT NULL,
    noidung character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "IDsinhvien" integer,
    "IDgiangvien" integer
);
    DROP TABLE public.thongbaos;
       public         heap    postgres    false            ?            1259    184170    tintucs    TABLE     ?   CREATE TABLE public.tintucs (
    "IDtintuc" integer NOT NULL,
    chude text,
    noidung text,
    ngaydang timestamp with time zone,
    anhtintuc text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.tintucs;
       public         heap    postgres    false            ?            1259    184168    tintucs_IDtintuc_seq    SEQUENCE     ?   CREATE SEQUENCE public."tintucs_IDtintuc_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."tintucs_IDtintuc_seq";
       public          postgres    false    211                       0    0    tintucs_IDtintuc_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."tintucs_IDtintuc_seq" OWNED BY public.tintucs."IDtintuc";
          public          postgres    false    210            ?            1259    184048    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    role character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    184046    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            V           2604    184173    tintucs IDtintuc    DEFAULT     x   ALTER TABLE ONLY public.tintucs ALTER COLUMN "IDtintuc" SET DEFAULT nextval('public."tintucs_IDtintuc_seq"'::regclass);
 A   ALTER TABLE public.tintucs ALTER COLUMN "IDtintuc" DROP DEFAULT;
       public          postgres    false    211    210    211            U           2604    184051    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            ?          0    184062    chudes 
   TABLE DATA           W   COPY public.chudes ("IDchude", tenchude, ghichu, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    203   ?L                 0    184104    detais 
   TABLE DATA           ?   COPY public.detais ("IDdetai", tendetai, thoigianbatdau, thoigianketthuc, "isActive", "isConfim", "createdAt", "updatedAt", "IDchude", "IDhoidong", "IDgiangvien") FROM stdin;
    public          postgres    false    207   ?L                  0    184078    donvis 
   TABLE DATA           q   COPY public.donvis ("IDdonvi", tendonvi, diachi, sodienthoai, truongdonvi, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    205   XN                 0    184086 
   giangviens 
   TABLE DATA           ?   COPY public.giangviens ("IDgiangvien", tengiangvien, gioitinh, namsinh, sodienthoai, diachi, hocvi, chucvu, "Khoa", anhgiangvien, huongnghiencuu, "isActive", "createdAt", "updatedAt", id, "IDdonvi") FROM stdin;
    public          postgres    false    206   `O       ?          0    184070    hoidongs 
   TABLE DATA           |   COPY public.hoidongs ("IDhoidong", chutichhoidong, sothanhvien, nhanxet, diemhoidong, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    204   ?P                 0    184127    lops 
   TABLE DATA           U   COPY public.lops ("IDlop", tenlop, sosinhvien, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    208   Q       ?          0    184057    roles 
   TABLE DATA           C   COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    202   TQ                 0    184135 	   sinhviens 
   TABLE DATA             COPY public.sinhviens ("IDsinhvien", tensinhvien, gioitinh, namsinh, quequan, sodienthoai, sourcecode, bacdaotao, hedaotao, khoadaotao, diemtichluy, kynang, anhsinhvien, "isActive", "isBook", "createdAt", "updatedAt", "IDdonvi", id, "IDlop", "IDdetai", "IDgiangvien") FROM stdin;
    public          postgres    false    209   qQ                 0    184179 	   thongbaos 
   TABLE DATA           g   COPY public.thongbaos (id, noidung, "createdAt", "updatedAt", "IDsinhvien", "IDgiangvien") FROM stdin;
    public          postgres    false    212   S                 0    184170    tintucs 
   TABLE DATA           l   COPY public.tintucs ("IDtintuc", chude, noidung, ngaydang, anhtintuc, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   ?T       ?          0    184048    users 
   TABLE DATA           T   COPY public.users (id, email, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    201   dX                  0    0    tintucs_IDtintuc_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."tintucs_IDtintuc_seq"', 1, false);
          public          postgres    false    210                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 14, true);
          public          postgres    false    200            \           2606    184069    chudes chudes_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.chudes
    ADD CONSTRAINT chudes_pkey PRIMARY KEY ("IDchude");
 <   ALTER TABLE ONLY public.chudes DROP CONSTRAINT chudes_pkey;
       public            postgres    false    203            d           2606    184111    detais detais_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.detais
    ADD CONSTRAINT detais_pkey PRIMARY KEY ("IDdetai");
 <   ALTER TABLE ONLY public.detais DROP CONSTRAINT detais_pkey;
       public            postgres    false    207            `           2606    184085    donvis donvis_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.donvis
    ADD CONSTRAINT donvis_pkey PRIMARY KEY ("IDdonvi");
 <   ALTER TABLE ONLY public.donvis DROP CONSTRAINT donvis_pkey;
       public            postgres    false    205            b           2606    184093    giangviens giangviens_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.giangviens
    ADD CONSTRAINT giangviens_pkey PRIMARY KEY ("IDgiangvien");
 D   ALTER TABLE ONLY public.giangviens DROP CONSTRAINT giangviens_pkey;
       public            postgres    false    206            ^           2606    184077    hoidongs hoidongs_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.hoidongs
    ADD CONSTRAINT hoidongs_pkey PRIMARY KEY ("IDhoidong");
 @   ALTER TABLE ONLY public.hoidongs DROP CONSTRAINT hoidongs_pkey;
       public            postgres    false    204            f           2606    184134    lops lops_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.lops
    ADD CONSTRAINT lops_pkey PRIMARY KEY ("IDlop");
 8   ALTER TABLE ONLY public.lops DROP CONSTRAINT lops_pkey;
       public            postgres    false    208            Z           2606    184061    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    202            h           2606    184142    sinhviens sinhviens_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.sinhviens
    ADD CONSTRAINT sinhviens_pkey PRIMARY KEY ("IDsinhvien");
 B   ALTER TABLE ONLY public.sinhviens DROP CONSTRAINT sinhviens_pkey;
       public            postgres    false    209            l           2606    184183    thongbaos thongbaos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.thongbaos
    ADD CONSTRAINT thongbaos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.thongbaos DROP CONSTRAINT thongbaos_pkey;
       public            postgres    false    212            j           2606    184178    tintucs tintucs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tintucs
    ADD CONSTRAINT tintucs_pkey PRIMARY KEY ("IDtintuc");
 >   ALTER TABLE ONLY public.tintucs DROP CONSTRAINT tintucs_pkey;
       public            postgres    false    211            X           2606    184056    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            o           2606    184112    detais detais_IDchude_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.detais
    ADD CONSTRAINT "detais_IDchude_fkey" FOREIGN KEY ("IDchude") REFERENCES public.chudes("IDchude") ON UPDATE CASCADE ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.detais DROP CONSTRAINT "detais_IDchude_fkey";
       public          postgres    false    203    2908    207            q           2606    184122    detais detais_IDgiangvien_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.detais
    ADD CONSTRAINT "detais_IDgiangvien_fkey" FOREIGN KEY ("IDgiangvien") REFERENCES public.giangviens("IDgiangvien") ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public.detais DROP CONSTRAINT "detais_IDgiangvien_fkey";
       public          postgres    false    2914    207    206            p           2606    184117    detais detais_IDhoidong_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.detais
    ADD CONSTRAINT "detais_IDhoidong_fkey" FOREIGN KEY ("IDhoidong") REFERENCES public.hoidongs("IDhoidong") ON UPDATE CASCADE ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.detais DROP CONSTRAINT "detais_IDhoidong_fkey";
       public          postgres    false    204    207    2910            n           2606    184099 "   giangviens giangviens_IDdonvi_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.giangviens
    ADD CONSTRAINT "giangviens_IDdonvi_fkey" FOREIGN KEY ("IDdonvi") REFERENCES public.donvis("IDdonvi") ON UPDATE CASCADE ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.giangviens DROP CONSTRAINT "giangviens_IDdonvi_fkey";
       public          postgres    false    205    206    2912            m           2606    184094    giangviens giangviens_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.giangviens
    ADD CONSTRAINT giangviens_id_fkey FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public.giangviens DROP CONSTRAINT giangviens_id_fkey;
       public          postgres    false    2904    201    206            u           2606    184158     sinhviens sinhviens_IDdetai_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sinhviens
    ADD CONSTRAINT "sinhviens_IDdetai_fkey" FOREIGN KEY ("IDdetai") REFERENCES public.detais("IDdetai") ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.sinhviens DROP CONSTRAINT "sinhviens_IDdetai_fkey";
       public          postgres    false    207    2916    209            r           2606    184143     sinhviens sinhviens_IDdonvi_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sinhviens
    ADD CONSTRAINT "sinhviens_IDdonvi_fkey" FOREIGN KEY ("IDdonvi") REFERENCES public.donvis("IDdonvi") ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.sinhviens DROP CONSTRAINT "sinhviens_IDdonvi_fkey";
       public          postgres    false    2912    209    205            v           2606    184163 $   sinhviens sinhviens_IDgiangvien_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sinhviens
    ADD CONSTRAINT "sinhviens_IDgiangvien_fkey" FOREIGN KEY ("IDgiangvien") REFERENCES public.giangviens("IDgiangvien") ON UPDATE CASCADE ON DELETE SET NULL;
 P   ALTER TABLE ONLY public.sinhviens DROP CONSTRAINT "sinhviens_IDgiangvien_fkey";
       public          postgres    false    206    209    2914            t           2606    184153    sinhviens sinhviens_IDlop_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sinhviens
    ADD CONSTRAINT "sinhviens_IDlop_fkey" FOREIGN KEY ("IDlop") REFERENCES public.lops("IDlop") ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public.sinhviens DROP CONSTRAINT "sinhviens_IDlop_fkey";
       public          postgres    false    2918    208    209            s           2606    184148    sinhviens sinhviens_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sinhviens
    ADD CONSTRAINT sinhviens_id_fkey FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.sinhviens DROP CONSTRAINT sinhviens_id_fkey;
       public          postgres    false    201    209    2904            x           2606    184189 $   thongbaos thongbaos_IDgiangvien_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.thongbaos
    ADD CONSTRAINT "thongbaos_IDgiangvien_fkey" FOREIGN KEY ("IDgiangvien") REFERENCES public.giangviens("IDgiangvien") ON UPDATE CASCADE ON DELETE SET NULL;
 P   ALTER TABLE ONLY public.thongbaos DROP CONSTRAINT "thongbaos_IDgiangvien_fkey";
       public          postgres    false    212    206    2914            w           2606    184184 #   thongbaos thongbaos_IDsinhvien_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.thongbaos
    ADD CONSTRAINT "thongbaos_IDsinhvien_fkey" FOREIGN KEY ("IDsinhvien") REFERENCES public.sinhviens("IDsinhvien") ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.thongbaos DROP CONSTRAINT "thongbaos_IDsinhvien_fkey";
       public          postgres    false    2920    212    209            ?   V   x?3?):?V?????v???Ë?J?Z???A\F??U*?<ܽ1/]?<5?8?$!m??Q82????@??Û?1z\\\ ي%?         O  x????N?0???)???7i?LHH]?R?b?B<s?ĀD``B*S#&W}?	7N?????,?^????28?Ϸp???)?LF׹???V2??-??wX??~?Ӏ?z$?B??=?t??[????)ڬ?n[e???{??ei?
?v???p?G$0?D???dL?V???:C:?nQ!?Fkμ?????|??੒qDeڌ?gyp8s????GqM>?Li@O?.?,???~ ?Z*2????"vIU?#I????'?v4V\(ُx?"?"I???ADpte??????_?h????1?o?6?h~>?)J"!?_|??8J?lQ?_??"          ?   x?uбN?0?????X??Ҹـ? Q???K?g?;u???P!U?	*$$6?fL^?o?Uf?????P????v????f?$el2?f?K???bO??y$?R??4F??E"?|&???_\?e?`ݿ9M??D??j??=8?m??????8Sb?aWv????N???5fBQ<???I?B?BR?I(??Ipٿ?dՄ&[?۾8,}w??.??þu/??y⟧??f)??ў?$I> -n          _  x?uQ?J?@]O?b??p??;?,???B\BiڴJc?C?ڵ?/?????????h+??}?9???u??????VN???a.&???N?s??e?{-i??H0Z?ʐ????z?Ȕ)fb?荳?d???L??????]?/?|>????# ???
%?U
?? ??? ?K"?????%? `?<??????j??M?7??[9???ӯb??0?F?8???j?\?<L??Q,O?H2?)??I<????E??J5%Jۡ?JpD?D?{tW??Rz?c???=?h?b?7]մ"???)??r??eV!?yo?5Y??a?(!????c??k??[;???,I??%????E?$??O???      ?   .   x?3??x?{f?	wO?KW0???CF\F0!
????qqq ??         7   x?3?????63N???? .#N_?o3'??1g??????#B?*??*F??? ?      ?      x?????? ? ?         ?  x?}??J?@??ۧػ$?l??M??"A??B?ٴ?im?C????P=)x??<T|????I?P?3?????@??Xl?e????y?~???T????& ?tPpP ?=????kί?~n6B(?uc??P?WC~QK???[??ܒ?P;?`?+XgX??r???|??-????>;倦?#??+???O?ǆ婍t?Jv???	??K?v9$?;?FH'\Ȅ????????-???Bb md???B@?Bx??^?0T??򼀚?н??Lcmo?+?H?H
W)}?K?c???ϲ`?C??	?"5i22??,?y???<1Y?'a??埏???"=?@?/I???͚{?=????!ǦH?fۧ?'4Q??8!?-?????`??qO?u[??7????         ?  x???=K?@???S?????\r???ũ?Vh?4??????`qtQ:??&48%?=???o?5o???ܓ????<???F}?|?????O?|f???????f?a?*L?:??e??.G??^????	??[X9?_?cߠa????_O?)l?Ж?c?:L"?4??̔?M?o@P??? \MB?J00[0k74?	??9???;??X???)V???ArM???3?$??BH??N?"u4SZ2L??C?(?N8??E?Js?W???u?)?H??L?$?F?i?`?????????? ??SYM?*ei8B֊??ځ???M|?۬??YJ?%?E)??*??M|5blꇤ????[)I??m?ChN?p?Y?r	??sbM<C????p?\$?\`?aE)???ض?/??R         ?  x??UMkW]K???mlu>?e??Z?4M?va0㑘y??F?fL?kp!S?^??D??IE?DP2C?⩆?_????ȑ鮅A̛?u???>?????Z??d@??R??#~Lt:??U?h(dH?B=??j??őN']???͓??1?d???Q?݈`?*??!}????"?BMz&>;???@AI???-???z?O?}??:b?A??r?????TҞ7?m?x?|"9???z?ӭv7?4ӎ?v;?ۃa??}???1?????o=?t? ????	8#?h???rK?	??-\???h???C?uv??????????g?p?/A?\u?	u???!?!??F?pq????$??#x?9??#0!?¸???????iBvu??
?=X#?q??1??;
t?g?d????9??e;T?U??.$??q??g?s?s??<?t?^??TG0??A??w	??~??^?̨?????!???2?S?ЁI?????????:%	?????_gt?C????H?ņ(???h?????O_?? L.)??}F??`Mp7???KPTPOMF,O?4
Z?????j??+?s!S/;????	??G????G{8???0+g?7D?0?|b?	??D=7???C???????c?????UƧ?|?"?SY??5??H?Ǘ????R?J?:}CW?[???o?t???????"6S??唂Z?q?]???/)_??L???0)??n????U?/̚????Zp,?ٴl<dYM~?X??S??n?n7v?j?V?-???p?n?:??6ǭ??Rq+U?ڕ?{?`???i???M?m??r?????R????x ?J??9H??C?^????oT???????Ȯ4??fe?\uW??a):????dN??=˙rC?????j?\8S??=ԛN????Tk??N?X,????      ?   ?   x???Kn?0E??*?WX?(+?
2q)7ة?4??/4"J@E?*yb?w?}?B?;??|H\?R?????$????Z???,_?W	?{????3???p [׻6?Ы?x?B?fQ&g̰t`?*?>???????f=4?Cv@???	Ƣo.>M ???gDN?C??Ɋ?4"?x??qc??f4R?CP??!?0V?a????X?o6 e ???RY?G?????C??G??;m?&?I/???+)?7@??     