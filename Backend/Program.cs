using Microsoft.EntityFrameworkCore;
using CourseWork.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using CourseWork.Controllers;
using CourseWork.Support;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});


// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
builder.Services.AddDbContext<EcommerceContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Connection")));

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp",
            builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
    });


// builder.Services.AddDbContext<EcommerceContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));


builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<EcommerceContext>().AddDefaultTokenProviders();

builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));



builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<RolesController>();
builder.Services.AddScoped<LogSupport>();
builder.Services.AddScoped<TokenRevocation>();
builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
                    });

var app = builder.Build();

app.Logger.LogInformation("Adding Routes");
app.MapGet("/", () => "Hello World!");
app.Logger.LogInformation("Starting the app");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.UseHttpsRedirection();


var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapSwagger().RequireAuthorization();


app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.MapGet("/Test", async (ILogger<Program> logger, HttpResponse response) =>
{
    logger.LogInformation("Testing logging in Ecommerce Backend Service");
    await response.WriteAsync("Yippie! Ecomm App Deployed on Azure");
});

app.UseCors("AllowReactApp");

app.Run();
app.UseRouting();
app.UseAuthorization();


record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

// Checkingcommits