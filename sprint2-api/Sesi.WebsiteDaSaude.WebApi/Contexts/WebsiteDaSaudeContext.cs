using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class WebsiteDaSaudeContext : DbContext
    {
        public WebsiteDaSaudeContext()
        {
        }

        public WebsiteDaSaudeContext(DbContextOptions<WebsiteDaSaudeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bairros> Bairros { get; set; }
        public virtual DbSet<Categorias> Categorias { get; set; }
        public virtual DbSet<Eventos> Eventos { get; set; }
        public virtual DbSet<Locais> Locais { get; set; }
        public virtual DbSet<Permissoes> Permissoes { get; set; }
        public virtual DbSet<Servicos> Servicos { get; set; }
        public virtual DbSet<Situacoes> Situacoes { get; set; }
        public virtual DbSet<TiposLocais> TiposLocais { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<LocaisEventos> LocaisEventos { get; set; }

        // Unable to generate entity type for table 'dbo.LocaisEventos'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.ServicosPrestados'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-K8F219B\\SQLEXPRESS;Trusted_Connection=True;Initial Catalog=WebsiteDaSaude");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            //eu que fiz
            modelBuilder.Entity<LocaisEventos>().HasKey(x => new {x.IdEvento, x.IdLocal});

            modelBuilder.Entity<LocaisEventos>()
            .HasOne<Eventos>(x => x.IdEventoNavigation)
            .WithMany(y => y.LocaisEventos)
            .HasForeignKey(z => z.IdEvento);

            modelBuilder.Entity<LocaisEventos>()
            .HasOne<Locais>(x => x.IdLocalNavigation)
            .WithMany(y => y.LocaisEventos)
            .HasForeignKey(z => z.IdLocal);

            //ate aqui

            modelBuilder.Entity<Bairros>(entity =>
            {
                entity.HasKey(e => e.IdBairro)
                    .HasName("PK__Bairros__4F198E846CB8AB63");

                entity.HasIndex(e => e.NomeBairro)
                    .HasName("UQ__Bairros__59F5076647181168")
                    .IsUnique();

                entity.Property(e => e.NomeBairro)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Categorias>(entity =>
            {
                entity.HasKey(e => e.IdCategoria)
                    .HasName("PK__Categori__A3C02A1098C23B7D");

                entity.HasIndex(e => e.NomeCategoria)
                    .HasName("UQ__Categori__98459A0BE0918D41")
                    .IsUnique();

                entity.Property(e => e.NomeCategoria)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Eventos>(entity =>
            {
                entity.HasKey(e => e.IdEvento)
                    .HasName("PK__Eventos__034EFC04532FFA0B");

                entity.Property(e => e.DataInicio).HasColumnType("date");

                entity.Property(e => e.DataTermino).HasColumnType("date");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.NomeEvento)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Locais>(entity =>
            {
                entity.HasKey(e => e.IdLocal)
                    .HasName("PK__Locais__C287B9BB24AF9E9F");

                entity.HasIndex(e => e.NomeLocal)
                    .HasName("UQ__Locais__C6ECE7271C672C90")
                    .IsUnique();

                entity.Property(e => e.Cep)
                    .IsRequired()
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.Logradouro)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NomeLocal)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdBairroNavigation)
                    .WithMany(p => p.Locais)
                    .HasForeignKey(d => d.IdBairro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Locais__IdBairro__11158940");

                entity.HasOne(d => d.IdTipoLocalNavigation)
                    .WithMany(p => p.Locais)
                    .HasForeignKey(d => d.IdTipoLocal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Locais__IdTipoLo__10216507");
            });

            modelBuilder.Entity<Permissoes>(entity =>
            {
                entity.HasKey(e => e.IdPermissao)
                    .HasName("PK__Permisso__356F319A41A1801C");

                entity.HasIndex(e => e.NomePermissao)
                    .HasName("UQ__Permisso__615891D36DAEB8A9")
                    .IsUnique();

                entity.Property(e => e.NomePermissao)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Servicos>(entity =>
            {
                entity.HasKey(e => e.IdServico)
                    .HasName("PK__Servicos__474DDE3AD945EA2D");

                entity.Property(e => e.NomeServico)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Servicos)
                    .HasForeignKey(d => d.IdCategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Servicos__IdCate__7FEAFD3E");
            });

            modelBuilder.Entity<Situacoes>(entity =>
            {
                entity.HasKey(e => e.IdSituacao)
                    .HasName("PK__Situacoe__810BCE3AC9EFBED3");

                entity.HasIndex(e => e.NomeSituacao)
                    .HasName("UQ__Situacoe__320AE072524B15B0")
                    .IsUnique();

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.NomeSituacao)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TiposLocais>(entity =>
            {
                entity.HasKey(e => e.IdTipoLocal)
                    .HasName("PK__TiposLoc__8140D77369BD5D6A");

                entity.HasIndex(e => e.NomeTipolocal)
                    .HasName("UQ__TiposLoc__16783736BE24F8CD")
                    .IsUnique();

                entity.Property(e => e.NomeTipolocal)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuarios__5B65BF976112CA76");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Usuarios__A9D1053421A44AE7")
                    .IsUnique();

                entity.Property(e => e.Cep)
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.DataNascimento).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Logradouro)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NomeUsuario)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdBairroNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdBairro)
                    .HasConstraintName("FK__Usuarios__IdBair__7D0E9093");

                entity.HasOne(d => d.IdPermissaoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdPermissao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuarios__IdPerm__7C1A6C5A");
            });
        }
    }
}
