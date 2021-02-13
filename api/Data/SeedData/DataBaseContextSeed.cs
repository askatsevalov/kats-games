using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Data.Contexts;
using Microsoft.Extensions.Logging;
using Models;
using Newtonsoft.Json;

namespace Data.SeedData
{
    public class DataBaseContextSeed
    {
        public static async Task SeedAsync(DataBaseContext context, string env, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Games.Any())
                {
                    var GamesData = File.ReadAllText($"{(env == "Development" ? "../Data/" : "")}SeedData/games.json");

                    var Games = JsonConvert.DeserializeObject<List<Game>>(GamesData);
                    foreach (var item in Games)
                    {
                        if (!context.Games.Any(x => x.Id == item.Id))
                            await context.Games.AddAsync(item);
                    }
                }
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<DataBaseContextSeed>();
                logger.LogError(ex.Message, "An error ocured during seeding data.");
            }
        }
    }
}
