using Microsoft.EntityFrameworkCore.Migrations;

namespace Robocam_FullSolution.Migrations
{
    public partial class AddUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(maxLength: 50, nullable: true),
                    PasswordHash = table.Column<string>(maxLength: 200, nullable: true),
                    PasswordSalt = table.Column<string>(maxLength: 200, nullable: true),
                    Email = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "PasswordHash", "PasswordSalt", "Username" },
                values: new object[] { 1, "emir.hasagic@gmail.com", "/E4FQ09EcgXx8LWTjfKuJNtw6n0=", "YbejCDm54OvG/p3yHVO+uQ==", "Streamer" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "PasswordHash", "PasswordSalt", "Username" },
                values: new object[] { 2, "emir.hasagic@gmail.com", "/E4FQ09EcgXx8LWTjfKuJNtw6n0=", "YbejCDm54OvG/p3yHVO+uQ==", "Commander" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
