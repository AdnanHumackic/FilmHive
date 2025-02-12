using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace filmHive.Services.Database;

public partial class FilmHiveContext : DbContext
{
    public FilmHiveContext()
    {
    }

    public FilmHiveContext(DbContextOptions<FilmHiveContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Film> Films { get; set; }

    public virtual DbSet<FilmFavorite> FilmFavorites { get; set; }

    public virtual DbSet<FilmGenre> FilmGenres { get; set; }

    public virtual DbSet<FilmPersonRole> FilmPersonRoles { get; set; }

    public virtual DbSet<FilmReview> FilmReviews { get; set; }

    public virtual DbSet<FilmRole> FilmRoles { get; set; }

    public virtual DbSet<Genre> Genres { get; set; }

    public virtual DbSet<List> Lists { get; set; }

    public virtual DbSet<ListFilm> ListFilms { get; set; }

    public virtual DbSet<Person> People { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserFilmStatus> UserFilmStatuses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost,1433;Database=filmHive;User Id=sa;Password=QWEasd123!;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Film>(entity =>
        {
            entity.HasKey(e => e.FilmId).HasName("PK__Film__6D1D229C5194FFAC");

            entity.ToTable("Film");

            entity.Property(e => e.FilmId).HasColumnName("FilmID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.ReleaseYear).HasColumnType("date");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TrailerUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TrailerURL");
        });

        modelBuilder.Entity<FilmFavorite>(entity =>
        {
            entity.HasKey(e => e.FilmFavoriteId).HasName("PK__FilmFavo__53EE5F7466B8705B");

            entity.ToTable("FilmFavorite");

            entity.Property(e => e.FilmFavoriteId).HasColumnName("FilmFavoriteID");
            entity.Property(e => e.AddedAt).HasColumnType("date");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.MovieId).HasColumnName("MovieID");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Movie).WithMany(p => p.FilmFavorites)
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmFavori770013");

            entity.HasOne(d => d.User).WithMany(p => p.FilmFavorites)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmFavori386795");
        });

        modelBuilder.Entity<FilmGenre>(entity =>
        {
            entity.HasKey(e => e.FilmGenreId).HasName("PK__FilmGenr__3D28D4FDEECB53A3");

            entity.ToTable("FilmGenre");

            entity.Property(e => e.FilmGenreId).HasColumnName("FilmGenreID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.FilmId).HasColumnName("FilmID");
            entity.Property(e => e.GenreId).HasColumnName("GenreID");
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");

            entity.HasOne(d => d.Film).WithMany(p => p.FilmGenres)
                .HasForeignKey(d => d.FilmId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmGenre6155");

            entity.HasOne(d => d.Genre).WithMany(p => p.FilmGenres)
                .HasForeignKey(d => d.GenreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmGenre407812");
        });

        modelBuilder.Entity<FilmPersonRole>(entity =>
        {
            entity.HasKey(e => e.FilmPersonRoleId).HasName("PK__FilmPers__C00700BF320C428C");

            entity.ToTable("FilmPersonRole");

            entity.Property(e => e.FilmPersonRoleId).HasColumnName("FilmPersonRoleID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.FilmId).HasColumnName("FilmID");
            entity.Property(e => e.FilmRoleId).HasColumnName("FilmRoleID");
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.PersonId).HasColumnName("PersonID");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");

            entity.HasOne(d => d.Film).WithMany(p => p.FilmPersonRoles)
                .HasForeignKey(d => d.FilmId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmPerson75521");

            entity.HasOne(d => d.FilmRole).WithMany(p => p.FilmPersonRoles)
                .HasForeignKey(d => d.FilmRoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmPerson906505");

            entity.HasOne(d => d.Person).WithMany(p => p.FilmPersonRoles)
                .HasForeignKey(d => d.PersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmPerson202550");
        });

        modelBuilder.Entity<FilmReview>(entity =>
        {
            entity.HasKey(e => e.FilmReviewId).HasName("PK__FilmRevi__16C66462ABAC3F52");

            entity.ToTable("FilmReview");

            entity.Property(e => e.FilmReviewId).HasColumnName("FilmReviewID");
            entity.Property(e => e.Comment).IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.Grade).HasColumnType("decimal(2, 1)");
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.MovieId).HasColumnName("MovieID");
            entity.Property(e => e.ReviewDate).HasColumnType("date");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Movie).WithMany(p => p.FilmReviews)
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmReview205686");

            entity.HasOne(d => d.User).WithMany(p => p.FilmReviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFilmReview822467");
        });

        modelBuilder.Entity<FilmRole>(entity =>
        {
            entity.HasKey(e => e.FilmRoleId).HasName("PK__FilmRole__C4D595B27E34A815");

            entity.ToTable("FilmRole");

            entity.Property(e => e.FilmRoleId).HasColumnName("FilmRoleID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
        });

        modelBuilder.Entity<Genre>(entity =>
        {
            entity.HasKey(e => e.GenreId).HasName("PK__Genre__0385055E6BEE79EE");

            entity.ToTable("Genre");

            entity.Property(e => e.GenreId).HasColumnName("GenreID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedAt).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
        });

        modelBuilder.Entity<List>(entity =>
        {
            entity.HasKey(e => e.ListId).HasName("PK__List__E383286558FE24C9");

            entity.ToTable("List");

            entity.Property(e => e.ListId).HasColumnName("ListID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.ListDescription)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ListName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Lists)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKList655248");
        });

        modelBuilder.Entity<ListFilm>(entity =>
        {
            entity.HasKey(e => e.ListFilmId).HasName("PK__ListFilm__C8034089D2A3723C");

            entity.ToTable("ListFilm");

            entity.Property(e => e.ListFilmId).HasColumnName("ListFilmID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.FilmId).HasColumnName("FilmID");
            entity.Property(e => e.ListId).HasColumnName("ListID");
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.TimeOfDeletion)
                .HasDefaultValueSql("('0')")
                .HasColumnType("date");

            entity.HasOne(d => d.Film).WithMany(p => p.ListFilms)
                .HasForeignKey(d => d.FilmId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKListFilm769137");

            entity.HasOne(d => d.List).WithMany(p => p.ListFilms)
                .HasForeignKey(d => d.ListId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKListFilm928791");
        });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.PersonId).HasName("PK__Person__AA2FFB8514D11300");

            entity.ToTable("Person");

            entity.Property(e => e.PersonId).HasColumnName("PersonID");
            entity.Property(e => e.BirthDate).HasColumnType("date");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE3AB7F1B0E9");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedAt).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CCAC4DE27C2E");

            entity.ToTable("User");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Biography)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.DateOfBirth).HasColumnType("date");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PasswordSalt)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKUser68364");
        });

        modelBuilder.Entity<UserFilmStatus>(entity =>
        {
            entity.HasKey(e => e.UserFilmStatusId).HasName("PK__UserFilm__75EEB268057EA3A2");

            entity.ToTable("UserFilmStatus");

            entity.Property(e => e.UserFilmStatusId).HasColumnName("UserFilmStatusID");
            entity.Property(e => e.CreatedAt).HasColumnType("date");
            entity.Property(e => e.FilmId).HasColumnName("FilmID");
            entity.Property(e => e.ModifiedAt).HasColumnType("date");
            entity.Property(e => e.TimeOfDeletion).HasColumnType("date");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Film).WithMany(p => p.UserFilmStatuses)
                .HasForeignKey(d => d.FilmId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKUserFilmSt337169");

            entity.HasOne(d => d.User).WithMany(p => p.UserFilmStatuses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKUserFilmSt57457");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
