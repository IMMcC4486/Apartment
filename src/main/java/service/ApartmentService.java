package service;

import dao.ApartmentDAO;

public class ApartmentService {

	public static String getApartments() {
		return new ApartmentDAO().getApartments();
	};
	
	public static boolean checkApartments(String ApartmentName) {
		return new ApartmentDAO().checkApartment(ApartmentName);
	};
	
	public static void changeRank(String ApartmentName, int rankChange) {
		new ApartmentDAO().changeRank(ApartmentName, rankChange);
	};
	
	public static void newApartment(String ApartmentName,String Address,String PhoneNumber,String ContractLength,String DateAvailable,int RentAmount,int UtilitiesCost,int UpFrontCost, String Notes) {
		new ApartmentDAO().newApartment(ApartmentName, Address, PhoneNumber, ContractLength, DateAvailable, RentAmount, UtilitiesCost, UpFrontCost, Notes);
	};
	
}
