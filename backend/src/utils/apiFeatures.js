class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(searchableFields = []) {
    const keyword = this.queryString.search?.trim();

    if (keyword && searchableFields.length > 0) {
      const regex = new RegExp(keyword, 'i');
      this.query = this.query.find({
        $or: searchableFields.map((field) => ({ [field]: regex })),
      });
    }

    return this;
  }

  filterByStatus() {
    if (this.queryString.status) {
      this.query = this.query.find({ status: this.queryString.status });
    }

    return this;
  }

  sortByDueDate(defaultSort = '-created_at') {
    if (this.queryString.sort === 'asc') {
      this.query = this.query.sort({ due_date: 1, created_at: 1 });
    } else if (this.queryString.sort === 'desc') {
      this.query = this.query.sort({ due_date: -1, created_at: -1 });
    } else {
      this.query = this.query.sort(defaultSort);
    }

    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) > 0 ? Number(this.queryString.page) : 1;
    const limit = Number(this.queryString.limit) > 0 ? Number(this.queryString.limit) : 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this.pagination = { page, limit, skip };

    return this;
  }
}

module.exports = ApiFeatures;
