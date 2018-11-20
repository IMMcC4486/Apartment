package dao;

public interface Iapartment {

	// 
	public String getApartments();
	public boolean checkApartment(String ApartmentName);
	public void changeRank(String ApartmentName, int rankChange);
	
	public void newApartment(String ApartmentName,String Address,String PhoneNumber,String ContractLength,String DateAvailable,int RentAmount,int UtilitiesCost,int UpFrontCost, String Notes);
	
}
