namespace Models
{
    public class Game : BaseModel
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Route { get; set; }
    }
}