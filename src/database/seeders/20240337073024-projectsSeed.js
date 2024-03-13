"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("projects", [
      {
        name: "Website Penjualan Kain Tenun",
        image: "stock-img.jpg",
        start_date: new Date("2023-02-24"),
        end_date: new Date("2023-03-12"),
        technologies: ["react", "node", "type", "next"],
        description:
          "Sebuah website penjualan dan marketing untuk pemiliki toko penjualan kain tenun",
        diff_date: "30 Day",
        create_at: new Date(),
        update_at: new Date(),
        user_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("projects", null, {});
  },
};
