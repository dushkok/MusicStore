using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MusicStore.Models
{
    public class Album
    {
        [Key]
        public int AlbumId { get; set; }    

        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        public string Poster { get; set; }
        public string Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
        public double Price { get; set; }

        public int ArtistId { get; set; }
        public virtual Artist Artist { get; set; }

        public virtual List<Song> Songs { get; set; }

    }
}