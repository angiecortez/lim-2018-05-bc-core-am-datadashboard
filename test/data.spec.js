describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
let userA = {
  stats: {
    name : "Angie",
    percent: 100,
    exercises : {
      total: 2,
      completed: 2,
      percent: 100
    },
    reads : {
      total: 11,
      completed: 11,
      percent: 100
    },
    quizzes : {
      total: 3,
      completed: 3,
      percent: 100,
      scoreSum: 255,
      scoreAvg: 85
    }
  }
}
let userB = {
  stats: {
    name : "Lizeth Carmona",
    percent: 36,
    exercises : {
      total: 5,
      completed: 0,
      percent: 0
    },
    reads : {
      total: 10,
      completed: 2,
      percent: 20
    },
    quizzes : {
      total: 8,
      completed: 2,
      percent: 25,
      scoreSum: 160,
      scoreAvg: 80
    }
  }
}
let userC = {
  stats: {
    name : "Annie Herrera",
    percent: 90,
    exercises : {
      total: 5,
      completed: 4,
      percent: 80
    },
    reads : {
      total: 10,
      completed: 5,
      percent: 50
    },
    quizzes : {
      total: 8,
      completed: 4,
      percent: 50,
      scoreSum: 320,
      scoreAvg: 80
    }
  }
}
let allUser = [userA,userB,userC];


    it('debería retornar arreglo de usuarios ordenado por nombre ASC', => {
      assert.deepEqual(window.sortUsers(allUser, "Nombre", "ASC"), [userA,userC,userB])
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', => {
      assert.deepEqual(window.sortUsers(allUser, "Nombre", "DESC"), [userB,userC,userA])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', => {
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje Completitud Total", "ASC"), [userB,userC,userA])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', => {
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje Completitud Total", "DESC"), [userA,userC,userB])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', => {
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje ejercicios completos", "ASC"), [userB,userA,userC])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', => {
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje ejercicios completos", "DESC"), [userC,userA,userB])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', => {
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje Quizzes completos", "ASC"), [userB,userA,userC])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', => {
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje Quizzes completos", "DESC"), [userC,userA,userB])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', =>{
    assert.deepEqual(window.sortUsers(allUser, "Puntuacion promedio en quizzes", "ASC"), [userC,userB,userA])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', => {
      assert.deepEqual(window.sortUsers(allUser, "Puntuacion promedio en quizzes", "DESC"), [userA,userB,userC])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', =>{
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje de lecturas completadas", "ASC"), [userB,userC,userA])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', => {
      assert.deepEqual(window.sortUsers(allUser, "Porcentaje de lecturas completadas", "DESC"), [userA,userC,userB])
    });

  });
  
  describe('filterUsers(users, filterBy)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');

  });

});
