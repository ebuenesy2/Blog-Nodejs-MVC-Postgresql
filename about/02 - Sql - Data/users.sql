PGDMP  4    8                 |            test    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16396    test    DATABASE        CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1254';
    DROP DATABASE test;
                postgres    false            �            1259    16654    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_byid integer,
    isupdated integer DEFAULT 0 NOT NULL,
    updated_at timestamp with time zone,
    updated_byid integer,
    isactive integer DEFAULT 1 NOT NULL,
    isdeleted integer DEFAULT 0 NOT NULL,
    deleted_at timestamp with time zone,
    deleted_byid integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16653    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    220            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    219            !           2604    16657    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �          0    16654    users 
   TABLE DATA           �   COPY public.users (id, full_name, email, password, created_at, created_byid, isupdated, updated_at, updated_byid, isactive, isdeleted, deleted_at, deleted_byid) FROM stdin;
    public          postgres    false    220          �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 11, true);
          public          postgres    false    219            '           2606    16665    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �   �  x���;�� Fk�W�G{�ۏ�l"MJ��Ji��b����H���8))l	�{$���������؀�Z�)���j��o��F1�ˆT2��#��ĸ�*��>0��hm�!S����;"˖�_X2��l�����tAݯøY�[ڀRu%UQ��O��f�h�3�'������	.�,*�2�����9V��Iw�����K�P�-J%:�k�,~4!:#2���}
�y�[P� -_�BO��߻Ά���� �����zeK�Jr^�B��j��g�u�R2�6��R����t��{����׌zX�ɝv�� q�Bn��}������~��L��	��f�j	�%�YQJI[��K�4���i)a�B�@CeuYHѳI�h��xKo����=^�Juꔗ�/p8���G�     