using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Data.Repos
{
    public interface IGameRepository
    {
        Task<IEnumerable<Game>> ListAsync(int? storeId = null, bool orderByDate = false, string search = null);
        Task<Game> GetAsync(int id);
        Task<Game> CreateAsync(Game item);
        Task<Game> UpdateAsync(int id, Game item);
        Task DeleteAsync(int id);
    }
}
