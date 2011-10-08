<%@ WebHandler Language="C#" Class="upload" %>

using System;
using System.Web;
using System.IO;

public class upload : IHttpHandler {

	public void ProcessRequest(HttpContext context)
	{
		string sDirectory = HttpContext.Current.Server.MapPath(@context.Request["folder"]);
		if (!Directory.Exists(sDirectory))
		{
			Directory.CreateDirectory(sDirectory);
		}
		var request = context.Request;
		var requestType = request.Headers["Wijmo-RequestType"];
		if (!String.IsNullOrEmpty(requestType) && requestType == "XMLHttpRequest")
		{
			var fileName = request.Headers["Wijmo-FileName"];
			using (FileStream fs = new FileStream(sDirectory + "\\" + fileName, FileMode.Create))
			{
				var inputStream = context.Request.InputStream;
				byte[] bytes = new byte[(int)inputStream.Length];
				inputStream.Read(bytes, 0, (int)inputStream.Length);
				fs.Write(bytes, 0, bytes.Length);
				fs.Close();
			}
			context.Response.Write("Succeed");
		}
		else
		{
			HttpFileCollection oFiles = context.Request.Files;
			if (oFiles != null && oFiles.Count > 0)
			{
				for (int i = 0; i < oFiles.Count; i++)
				{
					string fileName = oFiles[i].FileName;
					int idx = fileName.LastIndexOf("\\");
					if (idx > -1)
					{
						fileName = fileName.Substring(idx);
					}
					oFiles[i].SaveAs(sDirectory + fileName);
				}
				context.Response.Write("Succeed");
			}
		}

	}

	public bool IsReusable
	{
		get
		{
			return false;
		}
	}

}