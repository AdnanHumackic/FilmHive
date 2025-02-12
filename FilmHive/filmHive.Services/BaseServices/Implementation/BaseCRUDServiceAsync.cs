using filmHive.Model.SearchObject;
using filmHive.Services.Auth;
using filmHive.Services.Database;
using filmHive.Services.ExceptionFilter;
using MapsterMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services.BaseServices.Implementation
{
    public class BaseCRUDServiceAsync<TModel, TSearch, TDbEntity, TInsert, TUpdate> : BaseServiceAsync<TModel, TSearch, TDbEntity> where TModel : class where TSearch : BaseSearchObject where TDbEntity : class
    {
        public BaseCRUDServiceAsync(FilmHiveContext context, IMapper mapper, ICurrentUserServiceAsync currentUserService) : base(context, mapper, currentUserService)
        {
        }

        public virtual async Task<TModel> InsertAsync(TInsert request, CancellationToken cancellationToken = default)
        {

            TDbEntity entity = Mapper.Map<TDbEntity>(request);

            await BeforeInsertAsync(request, entity);

            if (entity is ICreated createdEntity)
            {
                createdEntity.CreatedAt = DateTime.Now;
            }

            Context.Add(entity);
            await Context.SaveChangesAsync(cancellationToken);

            await AfterInsertAsync(request, entity);

            return Mapper.Map<TModel>(entity);
        }

        public virtual async Task BeforeInsertAsync(TInsert request, TDbEntity entity, CancellationToken cancellationToken = default) { }
        public virtual async Task AfterInsertAsync(TInsert request, TDbEntity entity, CancellationToken cancellationToken = default) { }


        public virtual async Task<TModel> UpdateAsync(int id, TUpdate request, CancellationToken cancellationToken = default)
        {
            var set = Context.Set<TDbEntity>();

            var entity = await set.FindAsync(id, cancellationToken);

            Mapper.Map(request, entity);
            await BeforeUpdateAsync(request, entity);

            if (entity is IModified modifiedEntity)
            {
                modifiedEntity.ModifiedAt = DateTime.Now;
                if (modifiedEntity.ModifiedAt == null)
                {
                    modifiedEntity.ModifiedBy=CurrentUserService.GetActiveUserId();
                }
            }

            await Context.SaveChangesAsync(cancellationToken);

            await AfterUpdateAsync(request, entity);

            return Mapper.Map<TModel>(entity);
        }

        public virtual async Task BeforeUpdateAsync(TUpdate request, TDbEntity entity, CancellationToken cancellationToken = default) { }
        public virtual async Task AfterUpdateAsync(TUpdate request, TDbEntity entity, CancellationToken cancellationToken = default) { }

        public virtual async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
        {

            var entity = await Context.Set<TDbEntity>().FindAsync(id, cancellationToken);
            await BeforeDeleteAsync(entity, cancellationToken);
            if (entity == null)
            {
                throw new UserException("Insert existing id.");
            }

            if (entity is ISoftDelete softDeleteEntity)
            {
                softDeleteEntity.IsDeleted = true;
                softDeleteEntity.TimeOfDeletion = DateTime.Now;
                softDeleteEntity.IsActive = false;
                Context.Update(entity);
            }
            else
            {
                Context.Remove(entity);
            }

            await Context.SaveChangesAsync(cancellationToken);
            await AfterDeleteAsync(entity, cancellationToken);

        }
        public virtual async Task BeforeDeleteAsync(TDbEntity entity, CancellationToken cancellationToken) { }
        public virtual async Task AfterDeleteAsync(TDbEntity entity, CancellationToken cancellationToken) { }

    }
}
