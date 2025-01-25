var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "dev",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        }
    );
});

var app = builder.Build();
app.UseCors("dev");

app.MapGet(
    "/",
    () =>
    {
        return Results.Json(new { error = "", message = "Hello World!" });
    }
);

app.Run();
