using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Repos;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _repo;

        public GameController(IGameRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return Ok(await _repo.ListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGameById(int id)
        {
            var result = await _repo.GetAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("")]
        public async Task<ActionResult<Game>> PostGame(Game model)
        {
            var result = await _repo.CreateAsync(model);
            if (result != null)
            {
                return Created($"api/game/{result.Id}", result);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(int id, Game model)
        {
            var result = await _repo.UpdateAsync(id, model);
            if (result != null)
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> DeleteGameById(int id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}