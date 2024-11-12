CREATE DATABASE BOOKS;

USE BOOKS;

CREATE TABLE USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_password VARCHAR(255),
    user_name CHAR(30),
    user_gender enum('Nam', 'Nữ'),
    date_created date,
    user_email varchar(50) check (
        `user_Email` regexp "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$"
    ),
    user_phone char(10) check (
        regexp_replace(user_phone, '[^0-9]', '')
    ),
    user_address VARCHAR(50),
    user_avatar varchar(255) default 'default.jpg'
);

select * from users;

UPDATE users
SET
    user_avatar = './src/assets/image/avatar1.jpg'
WHERE
    user_id = 2;

CREATE TABLE BOOK_TYPES (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name CHAR(30),
    type_detail VARCHAR(50)
);

select * from book_types;

insert book_types (type_name) value ('Economic');

CREATE TABLE BOOK (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_title CHAR(50),
    book_image varchar(255) default 'default.jpg',
    book_author CHAR(30),
    book_language CHAR(30),
    book_stock INT,
    book_price FLOAT(6, 3),
    book_discount INT,
    book_publisher CHAR(30),
    published_date DATE,
    total_pages INT,
    book_detail VARCHAR(500),
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES BOOK_TYPES (type_id)
);

select * from book;

insert into
    book (
        book_title,
        book_image,
        book_author,
        book_language,
        book_publisher,
        book_price,
        book_discount,
        total_pages,
        book_detail,
        type_id
    ) value (
        'Khám phá Mỹ Học',
        './assets/adven3.webp',
        'Mautice Nédoncelle',
        'Tiếng Việt',
        'Tri Thức',
        '95.000',
        '73.000',
        '228',
        'Cuốn sách không chỉ là một hành trình qua các khía cạnh của nghệ thuật, mà còn là một phiêu lưu cá nhân trong thế giới thẩm mĩ. Từ việc khám phá nguồn gốc của nghệ thuật đến việc suy ngẫm về trạng thái cuối cùng của mọi thứ, độc giả sẽ được dẫn dắt qua những con đường lớn của vũ trụ nghệ thuật.',
        2
    );

UPDATE BOOK
SET
    book_image = './src/assets/image/adven3.webp'
WHERE
    book_id = 12;

CREATE TABLE CARTS (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES USERS (user_id),
    FOREIGN KEY (book_id) REFERENCES BOOK (book_id)
);

select * from carts;