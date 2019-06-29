using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using kanban.Models;

namespace kanban.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly KanbanContext _context;

        public ListController(KanbanContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblKanbanList>>> Get()
        {
            return await _context.KanbanLists
                .OrderBy(x => x.OrderNo)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TblKanbanList>> Get(string id)
        {
            var list = await _context.KanbanLists.FindAsync(id);
            if (list == null)
            {
                return NotFound();
            }
            return list;
        }

        // POST api/tasks
        [HttpPost]
        public async Task<ActionResult<TblKanbanList>> PostList([FromBody] TblKanbanList item)
        {
            item.UpdateTime = DateTime.Now;
            _context.KanbanLists.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] TblKanbanList item)
        {
            if (id == item.Id)
            {
                return BadRequest();
            }
            item.UpdateTime = DateTime.Now;
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var list = await _context.KanbanLists.FindAsync(id);
            if (list == null)
            {
                return NotFound();
            }
            var cnt = await _context.TaskCards.CountAsync(x => x.KanbanListId == id);
            if(cnt > 0) {
                return BadRequest();
            }
            _context.KanbanLists.Remove(list);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}