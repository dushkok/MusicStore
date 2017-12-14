﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MusicStore.Models.MusicStore
{
    public class MusicStoreDbContext : DbContext
    {
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Song> Songs { get; set; }

        public MusicStoreDbContext() : base("DefaultConnection")
        {
            Database.SetInitializer<MusicStoreDbContext>(new CreateDatabaseIfNotExists<MusicStoreDbContext>());       
        }
    }
}