using filmHive.Model;
using filmHive.Model.SearchObject;
using filmHive.Services.Auth;
using filmHive.Services.BaseServices.Interfaces;
using filmHive.Services.Database;
using filmHive.Services.ExceptionFilter;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace filmHive.Services.BaseServices.Implementation
{
    public class BaseServiceAsync<TModel, TSearch, TDbEntity> : IServiceAsync<TModel, TSearch> where TSearch : BaseSearchObject where TDbEntity : class where TModel : class
    {
        public FilmHiveContext Context { get; }
        public IMapper Mapper { get; }
        public ICurrentUserServiceAsync CurrentUserService { get; }

        public BaseServiceAsync(FilmHiveContext context, IMapper mapper,
            ICurrentUserServiceAsync currentUserService)
        {
            Context = context;
            Mapper = mapper;
            CurrentUserService = currentUserService;
        }

        public async Task<PagedResult<TModel>> GetPagedAsync(TSearch search, CancellationToken cancellationToken = default)
        {
            List<TModel> result = new List<TModel>();

            var query = Context.Set<TDbEntity>().AsQueryable();

            if (!string.IsNullOrEmpty(search?.IncludeTables))
            {
                query = ApplyIncludes(query, search.IncludeTables);
            }

            if (search.IsDeleted != null)
            {
                query = query.Where(x => EF.Property<bool>(x, "IsDeleted") == search.IsDeleted);
            }

            if (search.IsActive != null)
            {
                query = query.Where(x => EF.Property<bool>(x, "IsActive") == search.IsActive);
            }

            query = AddFilter(search, query);

            int count = await query.CountAsync(cancellationToken);

            if (search?.Page.HasValue == true && search?.PageSize.HasValue == true)
            {
                query = query.Skip((search.Page.Value - 1) * search.PageSize.Value).Take(search.PageSize.Value);
            }

            if (!string.IsNullOrEmpty(search?.OrderBy) && !string.IsNullOrEmpty(search?.SortDirection))
            {
                query = ApplySorting(query, search.OrderBy, search.SortDirection);
            }

            var list = await query.ToListAsync(cancellationToken);
            result = Mapper.Map(list, result);

            PagedResult<TModel> pagedResult = new PagedResult<TModel>();

            pagedResult.ResultList = result;
            pagedResult.Count = count;

            return pagedResult;
        }

        public IQueryable<TDbEntity> ApplySorting(IQueryable<TDbEntity> query, string sortColumn, string sortDirection)
        {
            var entityType = typeof(TDbEntity);
            var property = entityType.GetProperty(sortColumn);
            if (property != null)
            {
                var parameter = Expression.Parameter(entityType, "x");
                var propertyAccess = Expression.MakeMemberAccess(parameter, property);
                var orderByExpression = Expression.Lambda(propertyAccess, parameter);

                string methodName = "";

                var sortDirectionToLower = sortDirection.ToLower();

                methodName = sortDirectionToLower == "desc" || sortDirectionToLower == "descending" ? "OrderByDescending" :
                    sortDirectionToLower == "asc" || sortDirectionToLower == "ascending" ? "OrderBy" : "";

                if (methodName == "")
                {
                    return query;
                }

                var resultExpression = Expression.Call(typeof(Queryable), methodName,
                                                       new Type[] { entityType, property.PropertyType },
                                                       query.Expression, Expression.Quote(orderByExpression));

                return query.Provider.CreateQuery<TDbEntity>(resultExpression);
            }
            else
            {
                return query;
            }
        }

        private IQueryable<TDbEntity> ApplyIncludes(IQueryable<TDbEntity> query, string includes)
        {
            try
            {
                var tableIncludes = includes.Split(',');
                query = tableIncludes.Aggregate(query, (current, inc) => current.Include(inc));
            }
            catch (Exception)
            {
                throw new UserException("Wrong include list!");
            }

            return query;
        }
        public virtual IQueryable<TDbEntity> AddFilter(TSearch search, IQueryable<TDbEntity> query)
        {
            return query;
        }
        public async Task<TModel> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await Context.Set<TDbEntity>().FindAsync(id, cancellationToken);

            if (entity != null)
            {
                return Mapper.Map<TModel>(entity);
            }
            else
            {
                return null;
            }
        }
    }

}
