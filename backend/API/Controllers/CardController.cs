using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        public CardController()
        {
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards()
        {
            // TODO: Your code here
            await Task.Yield();

            return new List<Card> 
            { 
                new Card
                {
                    Id = 0,
                    Path = "SALAM"
                },
                new Card
                {
                    Id = 1,
                    Path = "ALEIKUM"
                },
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCardById(int id)
        {
            // TODO: Your code here
            await Task.Yield();

            return null;
        }

        [HttpPost("")]
        public async Task<ActionResult<Card>> PostCard(Card model)
        {
            // TODO: Your code here
            await Task.Yield();

            return null;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCard(int id, Card model)
        {
            // TODO: Your code here
            await Task.Yield();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Card>> DeleteCardById(int id)
        {
            // TODO: Your code here
            await Task.Yield();

            return null;
        }
    }
}