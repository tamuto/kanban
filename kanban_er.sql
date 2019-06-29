CREATE TABLE tbl_project (
 project_id VARCHAR(36) NOT NULL,
 project_name VARCHAR(256) NOT NULL,
 order_no INT NOT NULL,
 display_flag INT NOT NULL,
 update_time TIMESTAMP NOT NULL,
 PRIMARY KEY (project_id)
);

CREATE TABLE tbl_kanban_list (
 kanban_list_id VARCHAR(36) NOT NULL,
 kanban_list_name VARCHAR(256) NOT NULL,
 order_no INT NOT NULL,
 project_id VARCHAR(36) NOT NULL,
 update_time TIMESTAMP NOT NULL,
 PRIMARY KEY (kanban_list_id)
);

CREATE TABLE tbl_task_card (
 task_card_id VARCHAR(36) NOT NULL,
 task_card_name VARCHAR(256) NOT NULL,
 description TEXT,
 assign VARCHAR(128),
 deadline VARCHAR(128),
 order_no INT,
 archive_flag INT NOT NULL,
 kanban_list_id VARCHAR(36) NOT NULL,
 update_time TIMESTAMP NOT NULL,
 PRIMARY KEY (task_card_id)
);

CREATE TABLE tbl_comments (
 comment_id VARCHAR(36) NOT NULL,
 task_card_id VARCHAR(36) NOT NULL,
 order_no INT NOT NULL,
 comment TEXT NOT NULL,
 commenter VARCHAR(128),
 update_time TIMESTAMP NOT NULL,
 PRIMARY KEY (comment_id)
);
