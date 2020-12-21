using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Data.Contexts;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Data.Repos;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration config, IWebHostEnvironment env)
        {
            _config = config;
            _env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSignalR();

            string ConnectionString = _env.IsDevelopment() ? _config.GetConnectionString("TestConnection") :
                $@"Server={Environment.GetEnvironmentVariable("POSTGRES_HOST")};
                Port={Environment.GetEnvironmentVariable("POSTGRES_PORT")};
                Database={Environment.GetEnvironmentVariable("POSTGRES_DB")};
                Username={Environment.GetEnvironmentVariable("POSTGRES_USER")};
                Password={Environment.GetEnvironmentVariable("POSTGRES_PASSWORD")};";

            services.AddDbContext<DataBaseContext>(options => options.UseNpgsql(ConnectionString));
            services.AddScoped<IGameRepository, GameRepository>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Kats Games API",
                    Description = "API для управления веб-приложением Kats Games.",
                    Contact = new OpenApiContact
                    {
                        Name = "Кацевалов Артем",
                        Email = "a79154721620@gmail.com",
                        Url = new System.Uri("https://vk.com/askatsevalov")
                    }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Kats Games API");
            });

            app.UseRouting();
            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
