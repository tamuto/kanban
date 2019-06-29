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
    public class CommentController : ControllerBase
    {
        private readonly KanbanContext _context;

        public CommentController(KanbanContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TblComment>> Get(string id)
        {
            var card = await _context.Comments.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }
            return card;
        }
        [HttpPost]
        public async Task<ActionResult<TblComment>> Post([FromBody] TblComment item)
        {
            item.UpdateTime = DateTime.Now;
            _context.Comments.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] TblComment item)
        {
            if (id != item.Id)
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
            var card = await _context.Comments.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }
            _context.Comments.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}