using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.AccessControl;
using System.Web;

namespace MusicStore.Models
{
    public class Artist
    {
        [Key]
        public int ArtistId { get; set; }   

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(250)]
        public string Bio { get; set; }

        public string Origin { get; set; }
        public string Picture { get; set; }

        public virtual List<Album> Albums { get; set; }

    }
}