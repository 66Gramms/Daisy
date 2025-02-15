using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Keyless]
    public class Party
    {
        public string PartyName { get; set; } = string.Empty;
    }
}