import getPool from "@config/database";

export default class CalculateRouteService {
  public async execute(): Promise<any> {
    const { rows: customers } = await getPool().query(
      "SELECT id, name, email, phone, coordinate_x, coordinate_y FROM customers"
    );

    const company = {
      id: "startCompany",
      name: "Empresa/Sede",
      email: "empresa@sede.com",
      phone: "1234567890",
      coordinate_x: 0,
      coordinate_y: 0,
    };

    let unvisited = [...customers];
    let route = [company];

    while (unvisited.length > 0) {
      const lastVisited = route[route.length - 1];
      let nearest = unvisited.reduce((nearest, toVisit) => {
        let nearestDistance = nearest
          ? this.calculateDistance(lastVisited, nearest)
          : Infinity;
        let toVisitDistance = this.calculateDistance(lastVisited, toVisit);
        return toVisitDistance < nearestDistance ? toVisit : nearest;
      }, null);

      unvisited = unvisited.filter((customer) => customer.id !== nearest.id);
      route.push(nearest);
    }

    route = this.twoOpt(route);

    const finalCompany = { ...company, id: "finalCompany" };
    route.push(finalCompany);

    return route;
  }

  private calculateDistance(
    a: { coordinate_x: number; coordinate_y: number },
    b: { coordinate_x: number; coordinate_y: number }
  ): number {
    return Math.sqrt(
      Math.pow(a.coordinate_x - b.coordinate_x, 2) +
        Math.pow(a.coordinate_y - b.coordinate_y, 2)
    );
  }

  private twoOpt(route: any[]) {
    let improvement = true;
    while (improvement) {
      improvement = false;
      for (let i = 1; i < route.length - 2; i++) {
        for (let j = i + 1; j < route.length - 1; j++) {
          if (j - i === 1) continue;
          if (
            this.calculateDistance(route[i - 1], route[j]) +
              this.calculateDistance(route[i], route[j + 1]) <
            this.calculateDistance(route[i - 1], route[i]) +
              this.calculateDistance(route[j], route[j + 1])
          ) {
            this.reverseSubroute(route, i, j);
            improvement = true;
          }
        }
      }
    }
    return route;
  }

  private reverseSubroute(route: any[], i: number, j: number) {
    let subroute = route.slice(i, j + 1);
    subroute.reverse();
    for (let k = i; k <= j; k++) {
      route[k] = subroute[k - i];
    }
  }
}
