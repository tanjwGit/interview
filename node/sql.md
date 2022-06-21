## char varchar 区别?
  - char 长度固定
  - varchar 长度可变
  - varchar 节省空间，但效率慢

## 创建表
  ```sql
    CREATE TABLE '表名' (
      id int NOT NULL AUTO_INCREMENT COMMENT '自增id',
      PRIMARY KEY (`id`),
      UNIQUE KEY `uniq_tb_page_name_key` (`name`)
    )
    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='页面
  ```
  - `PRIMARY KEY`: primary key 主键
  - `AUTO_INCREMENT`: auto_increment 自增
  - `UNIQUE KEY`: unique key 唯一约束(不重复)，实际上时建立了一个索引
  - `ENGINE`: engine 引擎类型

## 修改已有的表
  - 新增列
    ```sql
      alter table 表名
      add name char(20);
    ```
  - 删除列
    ```sql
      alter table 表名
      drop column name;
    ```

## 删除表
  ```sql
    drop table 表名;
  ```

## 重命名表
    ```sql
      rename tabel 表名1 to 表名2;
    ```