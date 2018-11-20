package model;

public class Apartment {

	String ApartmentName;
	String Address;
	String PhoneNumber;
	String ContractLength;
	String DateAvailable;
	int RentAmount;
	int UtilitiesCost;
	int UpFrontCost;
	int TotalMonthlyCost;
	String Notes;
	int QC;

	public Apartment() {
		super();
	}
	
	public Apartment(String apartmentName, String address, String phoneNumber, String contractLength,
			String dateAvailable, int rentAmount, int utilitiesCost, int upFrontCost, int totalMonthlyCost) {
		super();
		ApartmentName = apartmentName;
		Address = address;
		PhoneNumber = phoneNumber;
		ContractLength = contractLength;
		DateAvailable = dateAvailable;
		RentAmount = rentAmount;
		UtilitiesCost = utilitiesCost;
		UpFrontCost = upFrontCost;
		TotalMonthlyCost = totalMonthlyCost;
		QC = 3;
	}
	
	public String getApartmentName() {
		return ApartmentName;
	}

	public void setApartmentName(String apartmentName) {
		ApartmentName = apartmentName;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public String getPhoneNumber() {
		return PhoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		PhoneNumber = phoneNumber;
	}

	public String getContractLength() {
		return ContractLength;
	}

	public void setContractLength(String contractLength) {
		ContractLength = contractLength;
	}

	public String getDateAvailable() {
		return DateAvailable;
	}

	public void setDateAvailable(String dateAvailable) {
		DateAvailable = dateAvailable;
	}

	public int getRentAmount() {
		return RentAmount;
	}

	public void setRentAmount(int rentAmount) {
		RentAmount = rentAmount;
	}

	public int getUtilitiesCost() {
		return UtilitiesCost;
	}

	public void setUtilitiesCost(int utilitiesCost) {
		UtilitiesCost = utilitiesCost;
	}

	public int getUpFrontCost() {
		return UpFrontCost;
	}

	public void setUpFrontCost(int upFrontCost) {
		UpFrontCost = upFrontCost;
	}

	public int getTotalMonthlyCost() {
		return TotalMonthlyCost;
	}

	public void setTotalMonthlyCost(int totalMonthlyCost) {
		TotalMonthlyCost = totalMonthlyCost;
	}
	
	public String getNotes() {
		return Notes;
	}

	public void setNotes(String notes) {
		Notes = notes;
	}

	public int getQC() {
		return QC;
	}

	public void setQC(int qC) {
		QC = qC;
	}

	@Override
	public String toString() {
		return "Apartment [ApartmentName=" + ApartmentName + ", Address=" + Address + ", PhoneNumber=" + PhoneNumber
				+ ", ContractLength=" + ContractLength + ", DateAvailable=" + DateAvailable + ", RentAmount="
				+ RentAmount + ", UtilitiesCost=" + UtilitiesCost + ", UpFrontCost=" + UpFrontCost
				+ ", TotalMonthlyCost=" + TotalMonthlyCost + ", Notes=" + Notes + ", QC=" + QC + "]";
	}

	public String toJSON() {
		return "\"AN\": \"" + ApartmentName + 
				"\", \"Address\": \"" + Address + 
				"\", \"PN\": \"" + PhoneNumber + 
				"\", \"CLength\": \"" + ContractLength + 
				"\", \"DA\": \"" + DateAvailable+ 
				"\", \"RA\": \"" + RentAmount+ 
				"\", \"UC\": \"" + UtilitiesCost+ 
				"\", \"UFC\": \"" + UpFrontCost+ 
				"\", \"TMC\": \"" + TotalMonthlyCost + 
				"\", \"NOTES\": \"" + Notes + 
				"\", \"QC\": \"" + QC + 
				"\"";
	}
	
}
