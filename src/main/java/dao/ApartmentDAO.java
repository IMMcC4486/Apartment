package dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Apartment;
import util.DBconnection;

public class ApartmentDAO {
	
	// back end responses
	public String getApartments() {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBconnection.getConnection();
			String sql = "SELECT * FROM apartment";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			String apartmentList = "{\"apartmentList\": [";
			boolean anything = false;
			Apartment curApt = new Apartment();
			int first = 0;
			while (rs.next()) {
				anything = true;
				curApt.setApartmentName(rs.getString("ApartmentName"));
				curApt.setAddress(rs.getString("Address"));
				curApt.setPhoneNumber(rs.getString("PhoneNumber"));
				curApt.setContractLength(rs.getString("ContractLength"));
				curApt.setDateAvailable(rs.getString("DateAvailable"));
				curApt.setRentAmount(rs.getInt("RentAmount"));
				curApt.setUtilitiesCost(rs.getInt("UtilitiesCost"));
				curApt.setUpFrontCost(rs.getInt("UpFrontCost"));
				curApt.setTotalMonthlyCost(rs.getInt("TotalMonthlyCost"));
				curApt.setNotes(rs.getString("NOTES"));
				curApt.setQC(rs.getInt("QC"));

				//////////////////////////////////////////////

				if (first > 0) {
					apartmentList += ",{" + curApt.toJSON() + "}";
				} else {
					apartmentList += "{" + curApt.toJSON() + "}";
				}
				first++;
			}
			if (anything) {
				apartmentList += "]}";
			} else {
				apartmentList += "\"empty\"]}";
			}
			System.out.println(apartmentList);
			return apartmentList;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} finally {
			 try { if (rs != null) rs.close(); } catch (Exception e) {}; 
			 try { if (ps != null) ps.close(); } catch (Exception e) {};
			 try { if (conn != null) conn.close(); } catch (Exception e) {};
		}
	}
	
	public boolean checkApartment(String ApartmentName) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBconnection.getConnection();
			String sql = "SELECT * FROM apartment where ApartmentName = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1,  ApartmentName);
			rs = ps.executeQuery();
			boolean anything = false;
			while (rs.next()) {
				anything = true;
				break;
			}
			return anything;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (rs != null)
					rs.close();
			} catch (Exception e) {
			}
			;
			try {
				if (ps != null)
					ps.close();
			} catch (Exception e) {
			}
			;
			try {
				if (conn != null)
					conn.close();
			} catch (Exception e) {
			}
			;
		}
	}
	
	public void changeRank(String ApartmentName, int rankChange) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		CallableStatement cs = null;
		try {
			conn = DBconnection.getConnection();
			
			int newRank = 0;

			String Asql = "SELECT * FROM apartment where ApartmentName = ?";
			ps = conn.prepareStatement(Asql);
			ps.setString(1,  ApartmentName);
			rs = ps.executeQuery();
			while (rs.next()) {
				newRank = rs.getInt("QC");
			}
			newRank += rankChange;
			
			String sql = "call QC_UPDATE(?,?)";
			cs = conn.prepareCall(sql);
			cs.setString(1,ApartmentName);
			cs.setInt(2, newRank);
			cs.execute();
		} catch (SQLException e) {
			e.printStackTrace();			
		} finally {
			 try { if (cs != null) cs.close(); } catch (Exception e) {};
			 try { if (rs != null) rs.close(); } catch (Exception e) {}; 
			 try { if (ps != null) ps.close(); } catch (Exception e) {};
			 try { if (conn != null) conn.close(); } catch (Exception e) {};
		}
	};
	
	public void newApartment(String ApartmentName,String Address,String PhoneNumber,String ContractLength,String DateAvailable,int RentAmount,int UtilitiesCost,int UpFrontCost, String Notes) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		CallableStatement cs = null;
		try {
			conn = DBconnection.getConnection();

			String sql = "call NewApartment(?,?,?,?,?,?,?,?,?)";

			cs = conn.prepareCall(sql);

			cs.setString(1,ApartmentName);
			cs.setString(2, Address);
			cs.setString(3, PhoneNumber);
			cs.setString(4, ContractLength);
			cs.setString(5, DateAvailable);
			cs.setInt(6, RentAmount);
			cs.setInt(7, UtilitiesCost);
			cs.setInt(8, UpFrontCost);
			cs.setString(9,  Notes);
			cs.execute();
		} catch (SQLException e) {
			e.printStackTrace();			
		} finally {
			 try { if (cs != null) cs.close(); } catch (Exception e) {};
			 try { if (rs != null) rs.close(); } catch (Exception e) {}; 
			 try { if (ps != null) ps.close(); } catch (Exception e) {};
			 try { if (conn != null) conn.close(); } catch (Exception e) {};
		}
	}

}
