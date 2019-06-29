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
    public class CardController : ControllerBase
    {
        private readonly KanbanContext _context;

        public CardController(KanbanContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblTaskCard>>> Get()
        {
            return await _context.TaskCards
                .Where(x => x.ArchiveFlag == false)
                .OrderBy(x => x.OrderNo)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TblTaskCard>> Get(string id)
        {
            var card = await _context.TaskCards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }
            return card;
        }
        [HttpPost]
        public async Task<ActionResult<TblTaskCard>> Post([FromBody] TblTaskCard item)
        {
            item.UpdateTime = DateTime.Now;
            _context.TaskCards.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] TblTaskCard item)
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
            var card = await _context.TaskCards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }
            _context.TaskCards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("move/{id}/{kanbanId}")]
        public async Task<IActionResult> Move(string id, string kanbanId) {
            var card = await _context.TaskCards.FindAsync(id);
            if(card == null) {
                return NotFound();
            }
            card.KanbanListId = kanbanId;
            card.UpdateTime = DateTime.Now;
            // TODO: OrderNo
            _context.Entry(card).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}