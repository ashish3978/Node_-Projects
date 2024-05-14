USE [products]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[getOrders]

SELECT	'Return Value' = @return_value

GO
 execute getOrders


 select * from orders

 create procedure GetOrdersByCustomerIDAndCustomerName
 @CustomerID int,
 @CustomerName NVARCHAR(255)
 as
 begin
	select *
	from GetOrders 
	where CustomerID = @CustomerID 
	AND CustomerName = @CustomerName
 end;

use products
GetOrdersByContactNameAndCustomerName 'Maria Anders' ,'Alfreds Futterkiste';



exec GetOrders
select *from orders
insert into orders
values(6, 'Alfreds Futterkiste', 'Maria Anders', 'Obere Str. 57', 'Berlin', 'Germany');


USE products;
GO
SELECT *
FROM sys.procedures
WHERE name = 'GetOrdersByCustomerIDAndCustomerName';

CREATE PROCEDURE GetOrdersByContactNameAndCustomerName
    @ContactName NVARCHAR(255),
    @CustomerName NVARCHAR(255)
AS
BEGIN
    PRINT 'Executing GetOrdersByCustomerIDAndCustomerName';
    PRINT 'ContactName' + @ContactName;
    PRINT 'CustomerName: ' + @CustomerName;

    SELECT *
    FROM Orders
    WHERE ContactName = @ContactName
    AND CustomerName = @CustomerName;
END;

sp_helptext GetOrders



CREATE PROCEDURE [dbo].[GetOrders]  
AS  
SELECT * FROM orders  
GO;

use products

select * from  orders;

create procedure AllOrders
as 
select * from orders
GO;

exec AllOrders;

create procedure AllOrders2 @City nvarchar(255)
as 
select * from orders where City = @City
GO;

exec AllOrders2 @City = 'México D.F.'



create procedure AllOrder3 @City nvarchar(255),@CustomerName nvarchar(255)
as 
select * from orders where City = @City AND CustomerName = @CustomerName;
GO;

exec AllOrder3 @City = 'México D.F.', @CustomerName = 'Ana Trujillo Emparedados y helados';


select* from orders where not city = 'Berlin' OR Country = 'Germany';

select count(CustomerID), Country
from orders
group by Country

alter PROCEDURE GetOrdersByCity
	@City nvarchar(255)
	as
	begin
	select * from orders where City = @City;
	end;

	exec GetOrdersByCity @City = 'México D.F.'