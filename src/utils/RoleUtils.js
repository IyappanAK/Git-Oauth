class RoleInfo {
  constructor() {
    this.defaultPrivileges = {
      navigation: {},
    };

    this.privileges = this.defaultPrivileges;

    this.reset = () => {
      this.privileges = this.defaultPrivileges;
    };

    this.set = (privileges) => {
      this.privileges = privileges;
    };
  }
}

export default new RoleInfo();
