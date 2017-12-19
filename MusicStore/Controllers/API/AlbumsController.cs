using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using MusicStore.Models;
using MusicStore.Models.MusicStore;

namespace MusicStore.Controllers.API
{
    [EnableCors("*", "*", "*")]
    public class AlbumsController : ApiController
    {
        private MusicStoreDbContext db = new MusicStoreDbContext();

        // GET: api/Albums
        public IEnumerable<Album> GetAlbums()
        {
            return db.Albums.Include(a => a.Songs).ToList();
        }

        // GET: api/Albums/5
        [ResponseType(typeof(Album))]
        public IHttpActionResult GetAlbum(int id)
        {
            Album album = db.Albums.Find(id);
            if (album == null)
            {
                return NotFound();
            }

            return Ok(album);
        }

        // PUT: api/Albums/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAlbum(int id, Album album)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != album.AlbumId)
            {
                return BadRequest();
            }

            db.Entry(album).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Albums
        [ResponseType(typeof(Album))]
        public IHttpActionResult PostAlbum(Album album)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Albums.Add(album);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = album.AlbumId }, album);
        }

        // DELETE: api/Albums/5
        [ResponseType(typeof(Album))]
        public IHttpActionResult DeleteAlbum(int id)
        {
            Album album = db.Albums.Find(id);
            if (album == null)
            {
                return NotFound();
            }

            db.Albums.Remove(album);
            db.SaveChanges();

            return Ok(album);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AlbumExists(int id)
        {
            return db.Albums.Count(e => e.AlbumId == id) > 0;
        }
    }
}