
import AxiosHelper from "@/services/api/Axios";

/**
 * Helper class for demo API
 */
export default class Api {
  
  // eslint-disable-next-line class-methods-use-this
  static async fetchRecords(
    component,
    endPoint
  ) {
    component.loading = true;
    component.errorMessage = "";

    try {

        const params = {
            offset: 0,
            limit: 10,
        };

      const axiosInstance = AxiosHelper.getInstance();
      const apiResponse = await axiosInstance.get(endPoint, params);
      component.loading = false;
      return apiResponse.data || [];
    } catch (error) {
      const { message } = error;
      component.errorMessage = message;
      component.loading = false;
      return [];
    }
  }
}
