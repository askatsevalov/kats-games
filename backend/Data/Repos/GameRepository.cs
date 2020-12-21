using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Data.Repos
{
    public class GameRepository : IGameRepository
    {
        private DataBaseContext _context;

        public GameRepository(DataBaseContext context)
        {
            _context = context;
        }

        public async Task<Game> CreateAsync(Game item)
        {
            var result = (await _context.Games.AddAsync(item)).Entity;
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task DeleteAsync(int id)
        {
            var result = await _context.Games.FindAsync(id);
            if (result != null) 
            {
                _context.Games.Remove(result);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Game> GetAsync(int id)
        {
            var result = await _context.Games.FindAsync(id);
            return result;
        }

        public async Task<IEnumerable<Game>> ListAsync(int? storeId = null, bool orderByDate = false, string search = null)
        {
            var result = await _context.Games.ToListAsync();
            return result;
        }

        public async Task<Game> UpdateAsync(int id, Game item)
        {
            var result = await _context.Games.FindAsync(id);
            if (result != null)
            {
                result.Name = item.Name;
                result.ImageUrl = item.Name;
                result.Route = item.Route;
                result.Description = item.Description;
                await _context.SaveChangesAsync();
            }
            return result;
        }
    }
}