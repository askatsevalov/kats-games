using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        public CardController()
        {
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Game>>> GetCards()
        {
            // TODO: Your code here
            await Task.Yield();

            return new List<Game> 
            { 
                new Game
                {
                    Id = 0,
                    Name = "SALAM"
                },
                new Game
                {
                    Id = 1,
                    Name = "ALEIKUM"
                },
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetCardById(int id)
        {
            // TODO: Your code here
            await Task.Yield();

            return null;
        }

        [HttpPost("")]
        public async Task<ActionResult<Game>> PostCard(Game model)
        {
            // TODO: Your code here
            await Task.Yield();

            return null;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCard(int id, Game model)
        {
            // TODO: Your code here
            await Task.Yield();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> DeleteCardById(int id)
        {
            // TODO: Your code here
            await Task.Yield();

            return null;
        }
    }
}