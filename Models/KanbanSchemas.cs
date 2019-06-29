using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace kanban.Models
{
    [Table("tbl_project")]
    public class TblProject
    {
        [Column("project_id")]
        public string Id { get; set; }
        [Column("project_name")]
        public string Name { get; set; }
        [Column("order_no")]
        public int OrderNo { get; set; }
        [Column("display_flag")]
        public bool DisplayFlag { get; set; }
        [Column("update_time")]
        public DateTime UpdateTime { get; set; } 
    }

    [Table("tbl_kanban_list")]
    public class TblKanbanList
    {
        [Column("kanban_list_id")]
        public string Id { get; set; }
        [Column("kanban_list_name")]
        public string Name { get; set; }
        [Column("order_no")]
        public int OrderNo { get; set; }
        [Column("project_id")]
        public string ProjectId { get; set; }
        [Column("update_time")]
        public DateTime UpdateTime { get; set; } 
    }

    [Table("tbl_task_card")]
    public class TblTaskCard
    {
        [Column("task_card_id")]
        public string Id { get; set; }
        [Column("task_card_name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("assign")]
        public string Assign { get; set; }
        [Column("deadline")]
        public string Deadline { get; set; }
        [Column("order_no")]
        public int OrderNo { get; set; }
        [Column("archive_flag")]
        public bool ArchiveFlag { get; set; }
        [Column("kanban_list_id")]
        public string KanbanListId { get; set; }
        [Column("update_time")]
        public DateTime UpdateTime { get; set; } 
    }

    [Table("tbl_comment")]
    public class TblComment
    {
        [Column("comment_id")]
        public string Id { get; set; }
        [Column("task_card_id")]
        public string TaskCardId { get; set; }
        [Column("order_no")]
        public int OrderNo { get; set; }
        [Column("comment")]
        public string Comment { get; set; }
        [Column("commenter")]
        public string Commenter { get; set; }
        [Column("update_time")]
        public DateTime UpdateTime { get; set; }
    }
}
