

ALTER TABLE order_detail
DROP
FOREIGN KEY order_detail_ibfk_1;

ALTER TABLE order_detail
DROP
FOREIGN KEY order_detail_ibfk_2;

ALTER TABLE `order`
DROP
FOREIGN KEY order_ibfk_1;

ALTER TABLE product
DROP
FOREIGN KEY product_ibfk_1;

ALTER TABLE product
DROP
FOREIGN KEY product_ibfk_2;

ALTER TABLE rating
DROP
FOREIGN KEY rating_ibfk_1;

ALTER TABLE rating
DROP
FOREIGN KEY rating_ibfk_2;

ALTER TABLE user
DROP
FOREIGN KEY user_ibfk_1;

ALTER TABLE wish_list
DROP
FOREIGN KEY wish_list_ibfk_1;

ALTER TABLE wish_list
DROP
FOREIGN KEY wish_list_ibfk_2;

DROP TABLE banner;

DROP TABLE category;

DROP TABLE commentp;

DROP TABLE img_product;

DROP TABLE `order`;

DROP TABLE order_detail;

DROP TABLE product;

DROP TABLE rating;

DROP TABLE `role`;

DROP TABLE user;

DROP TABLE vendor;

DROP TABLE wish_list;