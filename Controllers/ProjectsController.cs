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
    public class ProjectController : ControllerBase
    {
        private readonly KanbanContext _context;

        public ProjectController(KanbanContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblProject>>> Get()
        {
            return await _context.Projects
                .Where(x => x.DisplayFlag == true)
                .OrderBy(x => x.OrderNo)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TblProject>> Get(string id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return project;
        }

        // POST api/projects
        [HttpPost]
        public async Task<ActionResult<TblProject>> Post([FromBody] TblProject item)
        {
            item.UpdateTime = DateTime.Now;
            _context.Projects.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        // PUT api/projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] TblProject item)
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

        // DELETE api/projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}