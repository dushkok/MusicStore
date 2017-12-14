using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MusicStore.Models
{
    public class Song
    {
        [Key]
        public int SongId { get; set; }

        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        public string Length { get; set; }  

        public int AlbumId { get; set; }
        public virtual Album Album { get; set; }

    }
}