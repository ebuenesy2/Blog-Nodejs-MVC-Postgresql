PGDMP  &    8                 |            test    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16396    test    DATABASE        CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1254';
    DROP DATABASE test;
                postgres    false            �            1259    16598    comments    TABLE     �  CREATE TABLE public.comments (
    id integer NOT NULL,
    blog_id integer NOT NULL,
    comment text NOT NULL,
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
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    16597    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    218            �           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    217            !           2604    16601    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    16598    comments 
   TABLE DATA           �   COPY public.comments (id, blog_id, comment, created_at, created_byid, isupdated, updated_at, updated_byid, isactive, isdeleted, deleted_at, deleted_byid) FROM stdin;
    public          postgres    false    218   4       �           0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 32, true);
          public          postgres    false    217            '           2606    16609    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    218            �   �   x�u��j�0���)�^6�L��wOm/���q]���
}�F-H
a��of~$�_]?=�u�v🫟��n�b/#�҉���T�KB[�yA(�����e,J1�s�~��o�O�:���?� $�en�"߅��1V���_���&,YS���uD���vu��K�
�
��\�b�A%D�I4.җ?<�-SJcKCz�u����z�p�v�XS��l*ګ̲��_�     